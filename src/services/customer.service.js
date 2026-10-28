const CustomerRepository = require("../repositories/customer.repository");
const ApiError = require("../utils/apiError");

const customerRepo = new CustomerRepository();

class CustomerService {
  async create(data) {
    const {
      tenantId,
      firstName,
      lastName,
      email,
      phone,
      status,
      address,
      city,
      pincode,
      state,
    } = data;

    if (!tenantId) {
      throw new ApiError(400, "tenantId is required");
    }
    if (!firstName) {
      throw new ApiError(400, "First name is required");
    }
    if (!lastName) {
      throw new ApiError(400, "Last name is required");
    }
    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    const customer = await customerRepo.create({
      tenantId,
      firstName,
      lastName,
      email: email.toLowerCase().trim(),
      phone,
      status,
      address,
      city,
      pincode,
      state,
    });

    return customer;
  }

  async getAll(tenantId) {
    return await customerRepo.findAll({
      where: { tenantId },
    });
  }

  async getOne(id, tenantId) {
    const customer = await customerRepo.findOne({
      where: { id, tenantId },
    });

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    return customer;
  }

  async update(id, tenantId, data) {
    const customer = await customerRepo.findOne({
      where: { id, tenantId },
    });

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    await customer.update(data);

    return customer;
  }

  async delete(id, tenantId) {
    const customer = await customerRepo.findOne({
      where: { id, tenantId },
    });

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    await customer.destroy();

    return true;
  }
}

module.exports = CustomerService;
