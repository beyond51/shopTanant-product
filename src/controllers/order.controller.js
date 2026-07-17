const OrderService = require("../services/order.service");
const AsyncHandler = require("../utils/asyncHandler");
const baseController = require("./base.controller");

const orderService = new OrderService();
class OrderController extends baseController {
  constructor() {
    super(orderService);
  }

  create = AsyncHandler(async (req, res) => {
    const data = await orderService.createOrder({
      ...req.body,
      tenantId: req.tenantId,
    });

    res
      .status(201)
      .json({ success: true, message: "order placed successfully", data });
  });

  getOne = AsyncHandler(async (req, res) => {
    const data = await orderService.getOrderDetails(
      req.params.id,
      req.tenantId,
    );
    res.status(200).json({ success: true, data });
  });
}

module.exports = OrderController;
