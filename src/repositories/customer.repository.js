const Customer = require("../models/customer.model");
const ApiError = require("../utils/apiError");
const BaseRepository = require("./base.repository");

class CustomerRepository extends BaseRepository {
  constructor() {
    super(Customer);
  }

  async findCustomerBytenantIdAndEmail(email, tenantId) {
    let record = await this.model.findOne({
      where: {
        email,
        tenantId,
      },
    });
    if (!record) throw new ApiError(404, "customer not found");
    return record;
  }
  async findCustomerBytenantIdAndPhone(phone, tenantId) {
    let record = await this.model.findOne({
      where: {
        phone,
        tenantId,
      },
    });
    if (!record) throw new ApiError(404, "customer not found");
    return record;
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
