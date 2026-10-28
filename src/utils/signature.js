const crypto = require("crypto");

const signaturehelper = (razorpay_order_id, razorpay_payment_id) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  return generatedSignature;
};
module.exports = signaturehelper;
