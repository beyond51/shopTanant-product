const OrderRepository = require("../repositories/order.repository");
const tenantRepository = require("../repositories/tenant.repository");
const ApiError = require("./apiError");

let orderRepo = new OrderRepository();
let tenantRepo = new tenantRepository();

const createOrderNumber = async (shopDomain) => {
  let tenant = await tenantRepo.findTenantByDomain(shopDomain);
  if (!tenant) throw new ApiError(404, "tenant not found");
  let tenantId = tenant.id;

  let orders = await orderRepo.countOrderByTenantId(tenantId);

  let now = new Date();
  let date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  let orderNumber = tenant.shopName + "-" + date + "-" + orders;
  return orderNumber;
};
module.exports = createOrderNumber;
