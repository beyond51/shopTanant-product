const Product = require("../models/product.model");
const ApiError = require("../utils/apiError");
const BaseRepository = require("./base.repository");

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }
  async updateProduct(id, tenantId, data) {
    let record = await this.model.findOne({
      where: {
        tenantId,
        id,
      },
    });
    if (!record) throw new ApiError(404, "product not found");
    return await record.update(data);
  }

  async findOneProduct(id, tenantId) {
    let record = await this.model.findOne({
      where: {
        id,
        tenantId,
      },
    });

    if (!record) throw new ApiError(404, "product not found");

    return record;
  }

  async findAllproduct(tenantId) {
    return await this.model.findAll({
      where: {
        tenantId,
      },
    });
  }

  async findBySlug(slug) {
    return await this.model.findOne({
      where: { slug },
    });
  }

  async findBySku(sku) {
    return await this.model.findOne({
      where: { sku },
    });
  }

  async getActiveProduct() {
    return await this.model.findAll({
      where: {
        status: "Active",
      },
    });
  }
}

module.exports = ProductRepository;
