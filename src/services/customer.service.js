const CustomerRepository = require("../repositories/customer.repository");
const BaseService = require("./base.service");

const customerRepo = new CustomerRepository();
class CustomerService extends BaseService {
  constructor() {
    super(customerRepo);
  }
}

module.exports = CustomerService;
