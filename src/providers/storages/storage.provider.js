const ApiError = require("../../utils/apiError");

class StorageProvider {
  async upload(files, options) {
    throw new ApiError(400, "upload method is not implemented");
  }

  async delete(fileId) {
    throw new ApiError(400, "delete method not implemented");
  }
}

module.exports = StorageProvider;