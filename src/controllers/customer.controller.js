const CustomerService = require("../services/customer.service");
const baseController = require("./base.controller");

const cutomerService = new CustomerService();
class CustomerController extends baseController{
    constructor(){
        super(cutomerService)
    }
}


module.exports = CustomerController;