const Domainhelper = (shopName) => {
  const domain = process.env.DOMAIN + shopName;
  return domain;
};

module.exports = Domainhelper;
