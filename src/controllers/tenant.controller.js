const tenantService = require("../services/tenant.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");
const baseController = require("./base.controller");

let tenantSer = new tenantService();

class tenantController {
  create = AsyncHandler(async (req, res) => {
    let { token, shoptenant, user } = await tenantSer.registerTenant(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
    res
      .status(201)
      .json(new ApiResponse("tenant registered", { shoptenant, user }));
  });

  findById = AsyncHandler(async (req, res) => {
    const tenantId = req.params.tenantId;
    let tenant = await tenantSer.findTenantById(tenantId);

    if (!tenant) throw new ApiError(404, "tenant not found");
    res.status(200).json(new ApiResponse("tenant fetched", tenant));
  });

  updateById = AsyncHandler(async (req, res) => {
    const tenantId = req.params.tenantId;
    let tenant = await tenantSer.updateById(tenantId, req.body);
    res.status(200).json(new ApiResponse("tenant updated", tenant));
  });

  activate = AsyncHandler(async (req, res) => {
    const tenantId = req.params.tenantId;
    const data = await tenantSer.activateTenant(tenantId);
    res.status(200).json(new ApiResponse("activated", data));
  });
  diactivate = AsyncHandler(async (req, res) => {
    const tenantId = req.params.tenantId;
    const data = await tenantSer.deactivateTenant(tenantId);
    res.status(200).json(new ApiResponse("disactivated", data));
  });
}

module.exports = tenantController;
