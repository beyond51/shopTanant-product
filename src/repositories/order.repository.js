const Order = require("../models/order.model");
// const { OrderItem } = require("../models");
const BaseRepository = require("./base.repository");

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async findByOrderNumber(orderNumber) {
    return await this.model.findOne({
      where: {
        orderNumber,
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

  // async createOrderItems(items, options = {}) {
  //   return await OrderItem.bulkCreate(items, options);
  // }
}

module.exports = OrderRepository;
