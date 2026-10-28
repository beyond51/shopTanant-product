const Order = require("../models/order.model");
const ApiError = require("../utils/apiError");
// const { OrderItem } = require("../models");
const BaseRepository = require("./base.repository");

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }
  async findByRazorpayorderId(razorpayOrderId) {
    let record = await this.model.findOne({ razorpayOrderId });
    if (!record) throw new ApiError(404, "no order found with the id");
    return record;
  }

  async countOrderByTenantId(tenantId) {
    return await this.model.count({
      tenantId,
    });
  }

  async findByOrderNumber(orderNumber, tenantId) {
    return await this.model.findOne({
      where: {
        orderNumber,
        tenantId,
      },
    });
  }

  async findByCustomerId(customerId) {
    return await this.model.findAll({
      where: {
        customerId,
      },
    });
  }

  async findByStatus(status) {
    return await this.model.findAll({
      where: {
        status,
      },
    });
  }
  async getOrderOfCustomerId(customerId, tenantId) {
    let record = await this.model.findAll({
      where: {
        customerId,
        tenantId,
        paymentStatus: "Pending",
      },
    });
    if (record.length === 0) throw new ApiError(404, "no orders found");
    return record;
  }
}

module.exports = OrderRepository;
