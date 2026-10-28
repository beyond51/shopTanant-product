const PaymentService = require("../services/payment.service");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

const paymentService = new PaymentService();

class PaymentController {
  createPaymentOrder = AsyncHandler(async (req, res) => {
    const payment = await paymentService.createPaymentOrder(req.body);

    res.status(201).json(new ApiResponse("payment created", payment));
  });

  verifypayment = AsyncHandler(async (req, res) => {
    const result = await paymentService.verifyPayment(req.body);

    return res
      .status(200)
      .json(new ApiResponse("payment verified sucessfully", result));
  });
}
module.exports = PaymentController;
