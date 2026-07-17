const ProductRepository = require("../repositories/product.repository");
const BaseService = require("./base.service");

const productRepo= new ProductRepository()
 
class ProductService extends BaseService{
    constructor(){
        super(productRepo)
    }
}

module.exports= ProductService;