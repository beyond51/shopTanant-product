const tenantRepository = require("../repositories/tenant.repository");
const ApiError = require("../utils/apiError");
const { generateToken } = require("../utils/jwt");
const baseService = require("./base.service");
const Bcrypt = require("../utils/bcrypt");
const UserRepository = require("../repositories/user.repository");
const Sequelize = require("../config/db");
const UserTenantService = require("./userTenant.service");

const userRepo = new UserRepository();
const tenantRepo = new tenantRepository();
const bcrpyt = new Bcrypt();
const userTenantService = new UserTenantService();

class tenantService {
  async registerTenant(data) {
    const transaction = await Sequelize.transaction();

    const trimmedOfficialEmail = data?.officialEmail.toLowerCase().trim();

    const existedTenant = await tenantRepo.findByEmail(trimmedOfficialEmail);
    if (existedTenant) throw new ApiError(409, "tenant already exist");

    // create shop tenant

    let shoptenant = await tenantRepo.create(
      {
        shopName: data.shopName,
        officialEmail: trimmedOfficialEmail,
        shopDomain: data.shopDomain,
      },
      { transaction },
    );
    if (!shoptenant) throw new ApiError(400, "unable to create tenant");

    // create first user

    let hashedPassword = await bcrpyt.hashPass(data.password);

    const userData = {
      sellerName: data?.sellerName,
      sellerEmail: data?.sellerEmail,
      password: hashedPassword,
    };
    let user = await userRepo.findByEmail(data.sellerEmail);

    if (!user) {
      user = await userRepo.create(userData, { transaction });
    } else {
    }

    if (!user) throw new ApiError(400, "unable to create user");

    // create Usertenant
    let d = {
      userId: user.id,
      tenantId: shoptenant.id,
      role: "admin",
    };

    let usertenant = await userTenantService.create(d, { transaction });

    if (!usertenant) throw new ApiError(400, "usertenant error");
    
    await transaction.commit();

    // jwt token

    let token = generateToken(shoptenant.id);

    return { token, shoptenant, user };
  }

  async findTenantById(tenantId) {
    if (!tenantId) throw new ApiError(400, "tenantId is required");
    const tenant = await tenantRepo.findById(tenantId);

    return tenant;
  }

  async updateById(tenantId, data) {
    if (!tenantId) throw new ApiError(400, "tenantId is required");
    if (!data) throw new ApiError(400, "data is required");

    const tenant = await tenantRepo.update(tenantId, data);
    return tenant;
  }

  async deactivateTenant(tenantId) {
    const res = tenantRepo.deactivate(tenantId);
    return res;
  }

  async activateTenant(tenantId) {
    const res = tenantRepo.activate(tenantId);
    return res;
  }
}

module.exports = tenantService;
