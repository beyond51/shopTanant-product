const UserTenantService = require("../services/userTenant.service");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");
const userTenantService = new UserTenantService();

class userTenantController {
  findAllTenants = AsyncHandler(async (req, res) => {
    let userId = req.body;
    let data = await userTenantService.findByUserId(userId);

    res.status(200).json(new ApiResponse("fetched", data));
  });

  tenantselect = AsyncHandler(async (req, res) => {
    let { userId, tenantId } = req.body;

    let { token, user, tenant } =
      await userTenantService.verifyTenantAndGenarateToken(userId, tenantId);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSit: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json(new ApiResponse("verified", { user, tenant }));
  });
}
module.exports = userTenantController;
