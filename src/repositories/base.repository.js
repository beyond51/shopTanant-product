const ApiError = require("../utils/apiError");

class baseRepository {
  constructor(model) {
    this.model = model;
  }

  async find(options = {}) {
    return await this.model.findAll(options);
  }

  async create(data, options = {}) {
    return await this.model.create(data, options);
  }

  async update(userId, data, options = {}) {
    const record = await this.model.findByPk(userId);
    if (!record) throw new ApiError(404, "user not exist");
    return await record.update(data, options);
  }

  async delete(tenantId) {
    const record = await this.model.findByPk(tenantId);
    if (!record) throw new ApiError(404, "user not exist");
    return await record.destroy(options);
  }
}

module.exports = baseRepository;
