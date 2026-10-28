const BaseService = require("./base.service");
const UserTenantRepository = require("../repositories/userTenant.repository");
const userTenantRepository = require("../repositories/userTenant.repository");
const ApiError = require("../utils/apiError");
const jwtHelper = require("../utils/jwt");
const UserRepository = require("../repositories/user.repository");
const tenantRepository = require("../repositories/tenant.repository");

const UserTenantRepo = new userTenantRepository();
const userRepo = new UserRepository();
const tenantRepo = new tenantRepository();

class UserTenantService extends BaseService {
  constructor() {
    super(UserTenantRepo);
  }
  async create(data, options = {}) {
    const { userId, tenantId, role = "admin" } = data;

    if (!userId || !tenantId) {
      throw new ApiError(400, "userId and tenantId are required");
    }

    const existingRelation = await UserTenantRepo.findByUserIdAndTenantId(
      userId,
      tenantId,
    );

    if (existingRelation) {
      throw new ApiError(409, "User is already connected with this tenant");
    }
    return await UserTenantRepo.create(
      {
        userId,
        tenantId,
        role,
      },
      options,
    );
  }

  async verifyTenantAndGenarateToken(userId, tenantId) {
    if (!userId || !tenantId)
      throw new ApiError(400, "userId & tenantId is required");

    let user = await userRepo.findbyId(userId);

    let tenant = await tenantRepo.findById(tenantId);

    if (!user || !tenant)
      throw new ApiError(404, "user or tenant is not found");

    const membership = await UserTenantRepo.findByUserIdAndTenantId(
      userId,
      tenantId,
    );

    if (!membership)
      throw new ApiError(402, "You do not have access to this shop");

    // jwt token
    let token = jwtHelper.generateToken(userId, tenantId);

    if (!token) throw new ApiError(500, "error in jwt genrate token");

    return { token, user, tenant };
  }

  async findByUserId(userId) {
    const alltenants = await UserTenantRepo.findTenantsByuserId(userId);
    if (!alltenants) throw new ApiError(400, "tenants not found");

    return alltenants;
  }
}

module.exports = UserTenantService;
