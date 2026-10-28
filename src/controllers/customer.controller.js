const tenantRepository = require("../repositories/tenant.repository");
const CustomerService = require("../services/customer.service");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

const customerService = new CustomerService();
const tenantRepo = new tenantRepository();

class CustomerController {
  create = AsyncHandler(async (req, res) => {
    let tenantId = req.tenantId;
    if (!tenantId) {
      let { shopDomain } = req.body;
      let tenant = await tenantRepo.findTenantByDomain(shopDomain);
      tenantId = tenant.id;
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      status,
      address,
      city,
      pincode,
      state,
    } = req.body;

    const customer = await customerService.create({
      firstName,
      lastName,
      email,
      phone,
      status,
      address,
      city,
      pincode,
      state,
      tenantId,
    });

    res
      .status(201)
      .json(new ApiResponse("Customer created successfully", customer));
  });

  update = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;
    const { id } = req.params;

    const { firstName, lastName, email, phone, status } = req.body;

    const customer = await customerService.update(id, tenantId, {
      firstName,
      lastName,
      email,
      phone,
      status,
    });

    res
      .status(200)
      .json(new ApiResponse("Customer updated successfully", customer));
  });

  getAll = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;

    const customers = await customerService.getAll(tenantId);

    res
      .status(200)
      .json(new ApiResponse("Customers fetched successfully", customers));
  });

  getOne = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;
    const { id } = req.params;

    const customer = await customerService.getOne(id, tenantId);

    res
      .status(200)
      .json(new ApiResponse("Customer fetched successfully", customer));
  });

  delete = AsyncHandler(async (req, res) => {
    const tenantId = req.tenantId;
    const { id } = req.params;

    await customerService.delete(id, tenantId);

    res.status(200).json(new ApiResponse("Customer deleted successfully"));
  });
}

module.exports = CustomerController;
