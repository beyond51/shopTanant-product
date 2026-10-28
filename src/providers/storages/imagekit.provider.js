const imageKit = require("../../config/imagekIt");
const StorageProvider = require("./storage.provider");

class ImageKitProvider extends StorageProvider {
  async upload(file, options = {}) {
    const result = await imageKit.upload({
      file: file.buffer,
      fileName: options.fileName,
      folder: options.folder,
    });
    return {
      url: result.url,
      fileId: result.fileId,
      provider: "imagekit",
    };
  }
  async delete(fileId) {
    await imageKit.deleteFile(fileId);
    return true;
  }
}

module.exports = ImageKitProvider;
