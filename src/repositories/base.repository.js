const ApiError = require("../utils/apiError");

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async find(options = {}) {
    return await this.model.findAll(options);
  }

  async create(data, options = {}) {
    return await this.model.create(data, options);
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async findOne(options = {}) {
    return await this.model.findOne(options);
  }

  async findById(id, tenantId, options = {}) {
    return await this.model.findOne({
      where: { id, tenantId },
      ...options,
    });
  }

  async update(id, tenantId, data, options = {}) {
    const record = await this.model.findOne({
      where: { id, tenantId },
    });

    if (!record) {
      throw new ApiError(404, "Record not found");
    }

    return await record.update(data, options);
  }

  async delete(id, tenantId, options = {}) {
    const record = await this.model.findOne({
      where: { id, tenantId },
    });

    if (!record) {
      throw new ApiError(404, "Record not found");
    }

    return await record.destroy(options);
  }
}

module.exports = BaseRepository;