const StorageProvider = require("../../config/storage.config");

class StorageService {
  async uploadProductImage(files, tenantId) {
    const uploadedImages = [];

    for (const file of files) {
      const uploaded = await StorageProvider.upload(file, {
        fileName: `${Date.now()}-${file.originalname}`,
        folder: `/tenants/${tenantId}/products`,
      });

      uploadedImages.push(uploaded);
    }
    return uploadedImages;
  }
}

module.exports = StorageService;
