const User = require("../models/user.model");
const baseRepository = require("./base.repository");

class UserRepository extends baseRepository {
  constructor() {
    super(User);
  }
  async findbyId(id, tenantId) {
    return await this.model.findOne({
      where: {
        id,
        tenantId,
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
