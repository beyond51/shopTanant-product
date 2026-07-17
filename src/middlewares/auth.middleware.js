const tenantRepository = require("../repositories/tenant.repository");
const UserRepository = require("../repositories/user.repository");
const ApiError = require("../utils/apiError");
const { verifyToken } = require("../utils/jwt");

const tenantrepo = new tenantRepository();
const userRepo = new UserRepository();

const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) throw new ApiError(404, "token not found");

  let decode = verifyToken(token);
  if (!decode) throw new ApiError(400, "jwt expired");

  let user = await userRepo.findbyId(decode.id, decode.tenantId);
  if (!user) throw new ApiError(404, "user not found");
  
  req.user = user;
  next();
};

const tenantMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) throw new ApiError(404, "token not found");

  let decode = verifyToken(token);
  if (!decode) throw new ApiError(400, "jwt expired");

  let tenant = await tenantrepo.findOne(decode.id);
  if (!tenant) throw new ApiError(404, "tenant not found");

  req.tenant = tenant;
  next();
};
module.exports = { authMiddleware, tenantMiddleware };
