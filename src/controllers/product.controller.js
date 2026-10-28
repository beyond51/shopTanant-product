const ProductService = require("../services/product.service");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

const productService = new ProductService();

class ProductController {
  create = AsyncHandler(async (req, res) => {
    const createdBy = req.user.id;
    const tenantId = req.tenantId;
    const images = req.files;

    const { name, category, description, oldPrice, sellingPrice, stock } =
      req.body;

    const product = await productService.createProduct({
      name,
      category,
      description,
      oldPrice,
      sellingPrice,
      images,
      stock,
      createdBy,
      tenantId,
    });

    res
      .status(201)
      .json(new ApiResponse("Product created successfully", product));
  });

  update = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;
    const updatedBy = req.user.id;
    const { id } = req.params;

    const {
      name,
      category,
      description,
      oldPrice,
      sellingPrice,
      imageUrl,
      stock,
    } = req.body;

    const product = await productService.updateProduct(id, tenantId, {
      name,
      category,
      description,
      oldPrice,
      sellingPrice,
      imageUrl,
      stock,
      updatedBy,
    });

    res
      .status(200)
      .json(new ApiResponse("Product updated successfully", product));
  });

  getAll = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;

    const products = await productService.getAllProducts(tenantId);

    res
      .status(200)
      .json(new ApiResponse("Products fetched successfully", products));
  });

  getOne = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;
    const { id } = req.params;

    const product = await productService.getProductById(id, tenantId);

    res
      .status(200)
      .json(new ApiResponse("Product fetched successfully", product));
  });

  delete = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;
    const { id } = req.params;

    await productService.deleteProduct(id, tenantId);

    res.status(200).json(new ApiResponse("Product deleted successfully"));
  });
}

module.exports = ProductController;
