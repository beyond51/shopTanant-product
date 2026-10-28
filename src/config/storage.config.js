const ImageKitProvider = require("../providers/storages/imagekit.provider");

const createStorageProvider = () => {
  switch (process.env.STORAGE_PROVIDER) {
    case "imagekit":
    default:
      return new ImageKitProvider();
  }
};

module.exports = createStorageProvider();
