const User = require("../models/user.model");
const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async findbyId(userId) {
    return await this.model.findOne({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(sellerEmail) {
    return await this.model.findOne({
      where: { sellerEmail },
    });
  }
  async findByTenantId(tenantId, sellerEmail) {
    return await this.model.findOne({
      where: {
        tenantId,
        sellerEmail,
      },
    });
  }
}

module.exports = UserRepository;
