const UserRepository = require("../repositories/user.repository");
const ApiError = require("../utils/apiError");
const Bcrypt = require("../utils/bcrypt");
const jwtHelper = require("../utils/jwt");

const userRepo = new UserRepository();
const bcrpyt = new Bcrypt();

class UserService {
  async createUser(data, tenantId, options = {}) {
    let sellerEmail = data.sellerEmail?.toLowerCase()?.trim();
    // existing user check
    const existedUser = await userRepo.findByTenant(tenantId, sellerEmail);

    if (existedUser) {
      throw new ApiError(409, "user already exist");
    }

    //  password hashing
    const hashedPassword = await bcrpyt.hashPass(data?.password);

    try {
      // Create corresponding Tenant
      const TenantRepository = require("../repositories/tenant.repository");
      const tenantRepo = new TenantRepository();

      const slugify = (text) =>
        text
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-");

      const sellerName = data.sellerName || "Seller";
      const subdomain = `${slugify(sellerName)}-${Date.now()}`;

      const tenant = await tenantRepo.create(
        {
          name: `${sellerName}'s Shop`,
          officialEmail: sellerEmail,
          subdomain,
          status: "active",
        },
        options,
      );

      // creat user steps
      // 1. user data object
      const userData = {
        sellerName: data?.sellerName,
        sellerEmail: data?.sellerEmail,
        password: hashedPassword,
        tenantId: tenant.id,
      };

      // 2. creating user
      const User = await userRepo.create(userData, options);

      // 3. genrate jwt token
      const token = jwtHelper.generateToken(User.id);

      // 4. send response
      return { User, token };
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  }

  async loginUserByEmail(sellerEmail, tenantId, password) {
    let trimmedEmail = sellerEmail?.toLowerCase().trim();

    if (!trimmedEmail) throw new ApiError(400, "email is required");
    if (!password) throw new ApiError(400, "password is required");
    if (!tenantId) throw new ApiError(400, "tenantId is required");

    let User = await userRepo.findByTenant(tenantId, trimmedEmail);

    if (!User) throw new ApiError(404, "user not found");

    console.log(User);
    // verify password
    let verifyPass = await bcrpyt.comparePass(password, User.password);

    if (!verifyPass) throw new ApiError(401, "incorrect credentials");

    // jwt token
    let token = jwtHelper.generateToken(User.id, User.tenantId);

    if (!token) throw new ApiError(500, "error in jwt genrate token");

    return { User, token };
  }

  async updateUser(tenantId, sellerEmail, sellerName) {
    if (!tenantId) throw new ApiError(400, "tenantId is required");

    const user = await userRepo.findOne({ where: { tenantId } });
    if (!user) throw new ApiError(404, "user not found");

    const data = {};
    if (sellerEmail) data.sellerEmail = sellerEmail;
    if (sellerName) data.sellerName = sellerName;

    const updated = await user.update(data);
    return updated;
  }
}

module.exports = UserService;
