const { where } = require("sequelize");
const tenant = require("../models/tenant.model");
const ApiError = require("../utils/apiError");
const baseRepository = require("./base.repository");

class tenantRepository extends baseRepository {
  constructor() {
    super(tenant);
  }
  async findByEmail(officialEmail) {
    return await this.model.findOne({
      where: { officialEmail },
    });
  }
  async findOne(id = null, officialEmail = null) {
    const where = {};
    if (id) where.id = id;
    if (officialEmail) where.officialEmail = officialEmail;

    return await this.model.findOne({
      where,
    });
  }

  async findById(tenantId) {
    return await this.model.findByPk(tenantId);
  }

  async deactivate(tenantId, options = {}) {
    const record = await this.model.findByPk(tenantId);

    if (!record) throw new ApiError(404, "record not found");
    return await record.update({
      isActive: false,
    });
  }

  async activate(tenantId, options = {}) {
    const record = await this.model.findByPk(tenantId);
    return await record.update({
      isActive: true,
    });
  }
  async update(id, data, options = {}) {
    const record = await this.model.findByPk(id);

    if (!record) {
      throw new ApiError(404, "Tenant not found");
    }

    return await record.update(data, options);
  }

  async UpdateEmail(tenantId, data) {
    const record = await this.model.findByPk(tenantId);
    return await record.update({
      officialEmail: data,
    });
  }
}

module.exports = tenantRepository;
