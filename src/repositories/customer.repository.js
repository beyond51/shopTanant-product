const Customer = require("../models/customer.model");
const BaseRepository = require("./base.repository");

class CustomerRepository extends BaseRepository {
  constructor() {
    super(Customer);
  }

  async findByEmail(email) {
    return await this.model.findOne({
      where: { email },
    });
  }

  async findByPhone(phone) {
    return await this.model.findOne({
      where: { phone },
    });
  }
  async getActiveCustomers() {
    return await this.model.findAll({
      where: {
        status: "Active",
      },
    });
  }
}

module.exports = CustomerRepository;
