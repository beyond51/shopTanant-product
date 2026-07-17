const ApiError = require("../utils/apiError");

const toPositiveInteger = (value, fallback) => {
  const number = Number.parseInt(value, 10);
  return Number.isInteger(number) && number > 0 ? number : fallback;
};

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(tenantId, query = {}) {
    return await this.repository.findAll({
      where: { tenantId },
      ...query,
    });
  }

  async getOne(id, tenantId) {
    if (!id) {
      throw new ApiError(400, "id is required");
    }
    return await this.repository.findById(id, tenantId);
  }

  async search(query = {}, searchableFields = [], options = {}) {
    const queryObject =
      query && typeof query === "object" ? query : { q: query };

    const searchTerm = String(
      queryObject.q ?? queryObject.search ?? queryObject.keyword ?? "",
    ).trim();

    if (!searchableFields.length) {
      throw new ApiError(400, "Search fields are required");
    }

    if (searchTerm.length < 2) {
      throw new ApiError(400, "Search term must be at least 2 characters");
    }

    return await this.repository.search(searchTerm, searchableFields, {
      ...options,
      page: toPositiveInteger(queryObject.page, 1),
      limit: toPositiveInteger(queryObject.limit, 10),
    });
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async update(id, tenantId, data) {
    if (!id) {
      throw new ApiError(400, "id is required");
    }
    return await this.repository.update(id, tenantId, data);
  }

  async delete(id, tenantId) {
    if (!id) {
      throw new ApiError(400, "id is required");
    }
    return await this.repository.delete(id, tenantId);
  }

  async findOne(options = {}) {
    return await this.repository.findOne(options);
  }
}

module.exports = BaseService;