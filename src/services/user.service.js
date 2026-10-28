const UserRepository = require("../repositories/user.repository");
const ApiError = require("../utils/apiError");
const Bcrypt = require("../utils/bcrypt");
const jwtHelper = require("../utils/jwt");
const UserTenantService = require("./userTenant.service");

const userRepo = new UserRepository();
const usertenantservice = new UserTenantService();
const bcrpyt = new Bcrypt();

class UserService {
  async createUser(data, tenantId, options = {}) {
    let sellerEmail = data.sellerEmail?.toLowerCase()?.trim();
    // existing user check
    const existedUser = await userRepo.findByTenantId(tenantId, sellerEmail);

    if (existedUser) {
      throw new ApiError(409, "user already exist");
    }

    //  password hashing
    const hashedPassword = await bcrpyt.hashPass(data?.password);

    try {
      // creat user steps
      // 1. user data object
      const userData = {
        sellerName: data?.sellerName,
        sellerEmail: data?.sellerEmail,
        password: hashedPassword,
        tenantId,
      };

      // 2. creating user
      const User = await userRepo.create(userData, options);

      // 3. genrate jwt token
      const token = jwtHelper.generateToken(User.id);

      // 4. send response
      return { User, token };
    } catch (error) {
      console.log(error);
      throw new ApiError(500, error.message);
    }
  }

  async loginUserByEmail(sellerEmail, password) {
    let trimmedEmail = sellerEmail?.toLowerCase().trim();

    if (!trimmedEmail) throw new ApiError(400, "email is required");
    if (!password) throw new ApiError(400, "password is required");

    let User = await userRepo.findByEmail(sellerEmail);

    if (!User) throw new ApiError(404, "user not found");

    // verify password
    let verifyPass = await bcrpyt.comparePass(password, User.password);

    if (!verifyPass) throw new ApiError(401, "incorrect credentials");

    return { User };
  }

  async updateUser(userId, sellerEmail, sellerName) {
    if (!userId) throw new ApiError(400, "userId is required");

    let data = {
      sellerEmail,
      sellerName,
    };
    let updated = await userRepo.update(userId, data);
    return updated;
  }
}

module.exports = UserService;
