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

  async update(userId, data, options = {}) {
    const record = await this.model.findByPk(userId);
    if (!record) throw new ApiError(404, "user not exist");
    return await record.update(data, options);
  }

  async delete(id, tenantId, options = {}) {
    const record = await this.model.findOne({
      where: { id, tenantId },
    });

    if (!record) {
      throw new ApiError(404, "Record not found");
    }
    return await record.destroy();
  }
}

module.exports = BaseRepository;
