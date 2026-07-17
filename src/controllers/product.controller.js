const ProductService = require("../services/product.service");
const baseController = require("./base.controller");

const productService = new ProductService();
class ProductController extends baseController {
  constructor() {
    super(productService);
  }
}

module.exports = ProductController;
