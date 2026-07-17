const jwtHelper = require("../utils/jwt");
const ApiError = require("../utils/apiError");
const UserRepository = require("../repositories/user.repository");
const TenantRepository = require("../repositories/tenant.repository");

const userRepo = new UserRepository();
const tenantRepo = new TenantRepository();

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Authentication token is missing.");
    }

    const decoded = jwtHelper.verifyToken(token);

    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Invalid authentication token.");
    }

        const user = await userRepo.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    req.user = user;
    req.tenantId = user.tenantId;

    next();
  } catch (error) {
    next(error);
  }
};

const tenantMiddleware = async (req, res, next) => {
  try {
    req.tenantId = req.tenantId || req.body?.tenantId || req.query?.tenantId || req.headers?.["x-tenant-id"];

    if (!req.tenantId) {
      throw new ApiError(400, "Tenant id not found");
    }

    const tenant = await tenantRepo.findById(req.tenantId);

    if (!tenant) {
      throw new ApiError(404, "Tenant not found");
    }

    req.tenant = tenant;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
  tenantMiddleware,
};
