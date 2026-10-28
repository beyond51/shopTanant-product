const jwt = require("jsonwebtoken");
const ApiError = require("./apiError");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRY;

class jwtHelper {
  static generateToken(userId = null, tenantId = null) {
    try {
      if (!jwtSecret) throw new ApiError(404, "jwt fetching failed");
      let payload = {
        tenantId,
        userId,
      };
      let token = jwt.sign(payload, jwtSecret, {
        expiresIn: jwtExpiry,
      });

      return token;
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  }

  static verifyToken(token) {
    try {
      let decoded = jwt.verify(token, jwtSecret);
      return decoded;
    } catch (error) {
      throw new ApiError(401, "invalid token");
    }
  }

  static decodeToken(token) {
    try {
      let decoded = jwt.decode(token);
      return decoded;
    } catch (error) {
      throw new ApiError(400, "error in decoding jwt token");
    }
  }
}

module.exports = jwtHelper;
