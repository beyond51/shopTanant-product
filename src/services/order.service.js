const { sequelize } = require("../models/index.js");
const OrderRepository = require("../repositories/order.repository");
const ProductRepository = require("../repositories/product.repository");
const ApiError = require("../utils/apiError");
const BaseService = require("./base.service");

const orderRepo = new OrderRepository();
const productRepo = new ProductRepository();

class OrderService extends BaseService {
  constructor() {
    super(orderRepo);
  }

  async createOrder(payload, options = {}) {
    const {
      tenantId,
      customerId,
      items,
      paymentMethod,
      shippingAddress,
      billingAddress,
    } = payload;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new ApiError(
        400,
        "At least one product item is required to place an order",
      );
    }

    let transaction = options.transaction;
    let localTransaction = false;
    if (!transaction) {
      transaction = await sequelize.transaction();
      localTransaction = true;
    }

    try {
      let totalAmount = 0;
      const orderItemsToCreate = [];

      for (const item of items) {
        const { productId, quantity = 1 } = item;

        const product = await productRepo.findById(productId, tenantId, {
          transaction,
        });

        if (!product) {
          throw new ApiError(404, `Product with ID ${productId} not found`);
        }

        if (product.status !== "Active") {
          throw new ApiError(
            400,
            `Product '${product.name}' is not active and cannot be ordered`,
          );
        }

        if (product.inventoryQuantity < quantity) {
          throw new ApiError(
            400,
            `Insufficient stock for product '${product.name}'. Available: ${product.inventoryQuantity}`,
          );
        }

        await product.update(
          { inventoryQuantity: product.inventoryQuantity - quantity },
          { transaction },
        );

        const unitPrice = parseFloat(product.price);
        const totalPrice = unitPrice * quantity;
        totalAmount += totalPrice;

        orderItemsToCreate.push({
          tenantId,
          productId,
          quantity,
          unitPrice,
          totalPrice,
        });
      }

      const timestamp = Date.now();
      const random = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `ORD-${timestamp}-${random}`;

      const order = 
      await orderRepo.create(
        {
          tenantId,
          orderNumber,
          customerId,
          status: "Pending",
          paymentStatus: "Pending",
          paymentMethod,
          totalAmount,
          shippingAddress,
          billingAddress,
          items: orderItemsToCreate,
        },
        { transaction },
      );

      if (localTransaction) {
        await transaction.commit();
      }

      return order;
    } catch (error) {
      if (localTransaction && !transaction.finished) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async getOrderDetails(orderId, tenantId) {
    return await orderRepo.findById(orderId, tenantId, {
      include: [
        {
          association: "customer",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });
  }
}

module.exports = OrderService;
