const ProductRepository = require("../repositories/product.repository");
const ApiError = require("../utils/apiError");
const StorageService = require("./storage/Storage.service");

const productRepo = new ProductRepository();
const storageService = new StorageService();

class ProductService {
  async createProduct(data) {
    const {
      name,
      category,
      description,
      oldPrice,
      sellingPrice,
      images,
      stock,
      createdBy,
      tenantId,
    } = data;

    if (
      !name ||
      !category ||
      !description ||
      !oldPrice ||
      !sellingPrice ||
      !stock ||
      !tenantId ||
      !createdBy
    ) {
      throw new ApiError(400, "all fields are required");
    }
    let uploadedImages = [];

    if (images && images.length > 0) {
      uploadedImages = await storageService.uploadProductImage(
        images,
        tenantId,
      );
    }

    const product = await productRepo.create({
      name,
      category,
      description,
      oldPrice,
      sellingPrice,
      images: uploadedImages,
      stock,
      tenantId,
      createdBy,
    });

    return product;
  }

  async updateProduct(id, tenantId, data) {
    let {
      name,
      category,
      description,
      oldPrice,
      sellingPrice,
      imageUrl,
      stock,
      updatedBy,
    } = data;

    if (!id || !tenantId || !updatedBy) {
      throw new ApiError(400, "all filed are required");
    }

    const product = await productRepo.updateProduct(id, tenantId, data);
    return product;
  }

  async getAllProducts(tenantId) {
    return await productRepo.findAllproduct(tenantId);
  }

  async getProductById(id, tenantId) {
    const product = await productRepo.findOneProduct(id, tenantId);

    return product;
  }

  async deleteProduct(id, tenantId) {
    await productRepo.delete(id, tenantId);

    return true;
  }
}

module.exports = ProductService;
