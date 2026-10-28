const { Tenant } = require("../models");
const UserTenant = require("../models/userTenant.model");
const BaseRepository = require("./base.repository");

class userTenantRepository extends BaseRepository {
  constructor() {
    super(UserTenant);
  }
  async findBySellerId(userId) {
    return await this.model.findAll({
      where: {
        userId,
      },
    });
  }
  async findByUserIdAndTenantId(userId, tenantId) {
    return await this.model.findOne({ where: { userId, tenantId } });
  }
  async findTenantsByuserId(userId) {
    let result = await this.model.findAll({
      where: userId,
      include: [
        {
          model: Tenant,
          as: "tenant",
          attributes: [
            "id",
            "shopName",
            "shopDomain",

            "officialEmail",
            "createdAt",
          ],
        },
      ],
    });

    return result;
  }
}

module.exports = userTenantRepository;
