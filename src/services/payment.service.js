const razorpayInstance = require("../providers/payment/razorpay.provider");
const OrderRepository = require("../repositories/order.repository");
const ApiError = require("../utils/apiError");
const signaturehelper = require("../utils/signature");
const OrderService = require("./order.service");

const orderRepo = new OrderRepository();
const orderService = new OrderService();

class PaymentService {
  async createPaymentOrder(data) {
    const order = await orderService.createOrder(data);

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Number(order.totalAmount) * 100,
      currency: "INR",
      receipt: order.orderNumber,
    });
    await order.update({
      razorpayOrderId: razorpayOrder.id,
    });

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
      key: process.env.RAZORPAY_KEY_ID,
    };
  }
  async verifyPayment(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    const order = await orderRepo.findByRazorpayorderId(razorpay_order_id);

    const generatedSignature = signaturehelper(
      razorpay_order_id,
      razorpay_payment_id,
    );

    if (generatedSignature !== razorpay_signature) {
      throw new ApiError(400, "invalid payment signature");
    }
    await order.update({
      paymentStatus: "Paid",
      paymentMethod: "online",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });
    return order;
  }
}
module.exports = PaymentService;
