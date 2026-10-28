const OrderService = require("../services/order.service");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

const orderService = new OrderService();

class OrderController {
  // create = AsyncHandler(async (req, res) => {
  //   const order = await orderService.createOrder(req.body);

  //   res.status(201).json(new ApiResponse("Order created successfully", order));
  // });

  findOrders = AsyncHandler(async (req, res) => {
    const orders = await orderService.findPendingOrder(req.body);

    res.status(200).json(new ApiResponse("orders fetched", orders));
  });

  updateStatus = AsyncHandler(async (req, res) => {
    let orderNumber = req.params.orderNumber;
    let { shopDomain } = req.body;

    await orderService.updateStatus(orderNumber, shopDomain);

    res.status(200).json(new ApiResponse("updated"));
  });

  update = AsyncHandler(async (req, res) => {
    const tenantId = req.tenant.id;
    const { id } = req.params;

    const { orderName, customerId, orderDate, status, totalAmount } = req.body;

    const order = await orderService.updateOrder(id, tenantId, {
      orderName,
      customerId,
      orderDate,
      status,
      totalAmount,
    });

    res.status(200).json(new ApiResponse("Order updated successfully", order));
  });

  getAll = AsyncHandler(async (req, res) => {
    const tenantId = req.tenant.id;

    const orders = await orderService.getAllOrders(tenantId);

    res
      .status(200)
      .json(new ApiResponse("Orders fetched successfully", orders));
  });

  getOne = AsyncHandler(async (req, res) => {
    const tenantId = req.tenant.id;
    const { id } = req.params;

    const order = await orderService.getOrderById(id, tenantId);

    res.status(200).json(new ApiResponse("Order fetched successfully", order));
  });

  delete = AsyncHandler(async (req, res) => {
    const tenantId = req.tenant.id;
    const { id } = req.params;

    await orderService.deleteOrder(id, tenantId);

    res.status(200).json(new ApiResponse("Order deleted successfully"));
  });
}

module.exports = OrderController;
