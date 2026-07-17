const Product = require("../models/product.model");
const BaseRepository = require("./base.repository");

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
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
