const jwtHelper = require("../utils/jwt");
const ApiError = require("../utils/apiError");
const UserRepository = require("../repositories/user.repository");
const TenantRepository = require("../repositories/tenant.repository");
const { decode } = require("jsonwebtoken");

const userRepo = new UserRepository();
const tenantRepo = new TenantRepository();

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "Authentication token is missing.");
    }

    const decoded = jwtHelper.verifyToken(token);

    if (!decoded || !decoded.userId) {
      throw new ApiError(401, "Invalid authentication token.");
    }

    const user = await userRepo.findbyId(decoded.userId);
    const tenant = await tenantRepo.findById(decoded.tenantId);

    if (!tenant || !user) throw new ApiError(404, "user or tenant not found");

    req.user = user;
    req.tenant = tenant;
    next();
  } catch (error) {
    next(error);
  }
};

const createUsermiddleware = async (req, res, next) => {
  let { token } = req.cookies;

  if (!token) throw new ApiError(404, "token not found");

  let decoded = jwtHelper.verifyToken(token);

  if (!decoded) throw new ApiError(401, "invalid authentication found");

  let tenant = await tenantRepo.findOne(decoded.id);
  if (!tenant) throw new ApiError(404, "user not found");
  req.tenantId = tenant.id;
  next();
};

const tenantMiddleware = async (req, res, next) => {
  try {
    let tenantId = req.tenantId;
    if (!tenantId) {
      throw new ApiError(400, "Tenant id not found");
    }

    const tenant = await tenantRepo.findById(tenantId);

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
  createUsermiddleware,
};
