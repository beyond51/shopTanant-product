const CustomerRepository = require("../repositories/customer.repository");
const OrderRepository = require("../repositories/order.repository");
const ProductRepository = require("../repositories/product.repository");
const tenantRepository = require("../repositories/tenant.repository");
const ApiError = require("../utils/apiError");
const createOrderNumber = require("../utils/orderNumber");

const orderRepo = new OrderRepository();
const tenantRepo = new tenantRepository();
const customerRepo = new CustomerRepository();
const productRepo = new ProductRepository();

class OrderService {
  async createOrder(data) {
    const { customer, items, shippingAddress, shopDomain, paymentMethod } =
      data;

    if (!customer) throw new ApiError(404, "customer not found");
    let { customerEmail, customerPhone } = customer;

    let existedCustomer = await customerRepo.findByEmail(customerEmail);

    if (!existedCustomer) {
      throw new ApiError(400, "CustomerId is required");
    }
    let customerId = existedCustomer.id;

    if (!Array.isArray(items) || items.length === 0) {
      throw new ApiError(400, "Items are required");
    }

    if (!shopDomain) {
      throw new ApiError(400, "shopDomain is required");
    }
    let orderNumber = await createOrderNumber(shopDomain);

    let tenant = await tenantRepo.findTenantByDomain(shopDomain);
    if (!tenant) throw new ApiError(404, "tenant not exist");

    let tenantId = tenant.id;
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await productRepo.findOneProduct(
        item.productId,
        tenantId,
      );

      if (!product) {
        throw new ApiError(404, `Product not found: ${item.productId}`);
      }

      const unitPrice = Number(product.sellingPrice);
      const subtotal = unitPrice * item.quantity;

      totalAmount += subtotal;

      orderItems.push({
        productId: product.id,
        name: product.productName,
        images: product.images || null,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      });
    }

    const order = await orderRepo.create({
      tenantId,
      items: orderItems,
      customerId,
      orderNumber,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    return order;
  }

  async findPendingOrder(data) {
    let { email, phone, shopDomain } = data;
    if (!shopDomain) throw new ApiError(404, "shopDomain is required");

    let tenant = await tenantRepo.findTenantByDomain(shopDomain);
    if (!tenant) throw new ApiError(404, "tenant not found");

    let tenantId = tenant.id;
    let existedCustomer;
    if (email)
      existedCustomer = await customerRepo.findCustomerBytenantIdAndEmail(
        email,
        tenantId,
      );
    else if (phone)
      existedCustomer = await customerRepo.findCustomerBytenantIdAndPhone(
        phone,
        tenantId,
      );

    if (!existedCustomer) throw new ApiError(404, "customer not exist");

    let customerId = existedCustomer.id;

    let orders = await orderRepo.getOrderOfCustomerId(customerId, tenantId);

    return orders;
  }

  async updateOrder(id, tenantId, data) {
    const order = await orderRepo.findOne({
      where: { id, tenantId },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    await order.update(data);

    return order;
  }

  async getAllOrders(tenantId) {
    return await orderRepo.findAll({
      where: { tenantId },
    });
  }

  async getOrderById(id, tenantId) {
    const order = await orderRepo.findOne({
      where: { id, tenantId },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return order;
  }

  async deleteOrder(id, tenantId) {
    const order = await orderRepo.findOne({
      where: { id, tenantId },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    await order.destroy();

    return true;
  }

  async updateStatus(orderNumber, shopDomain) {
    if (!orderNumber || !shopDomain)
      throw new ApiError(400, "shopDomain is required");

    let tenant = await tenantRepo.findTenantByDomain(shopDomain);
    if (!tenant) throw new ApiError(404, "tenant not found");
    let tenantId = tenant.id;

    let findOrder = await orderRepo.findByOrderNumber(orderNumber, tenantId);
    if (!findOrder) throw new ApiError(404, "order not found");
    const nextStatus = {
      Pending: "confirmed",
      confirmed: "Processing",
      Processing: "Shipped",
      Shipped: "Delivered",
    };
    let newStatus = nextStatus[findOrder.status];
    await findOrder.update({
      status: newStatus,
    });
  }
}

module.exports = OrderService;
