const { Resend } = require("resend");
const ApiError = require("./apiError");

class EmailSender {
  constructor() {
    this.resend = new Resend(process.env.EMAIL_API_KEY);
  }
  async sendverificationEmail(email, otp) {
    const { data, error } = await this.resend.emails.send({
      from: "seller",
      to: [email],
      subject: "verify the email",
      html: `
        <h2>Verify your email</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP will expire in 10 minutes.</p>
        `,
    });

    if (error) {
      console.log("Resend Error", error);
      throw new ApiError(400, "failed to send otp");
    }

    return data;
  }
}

module.exports = EmailSender;
