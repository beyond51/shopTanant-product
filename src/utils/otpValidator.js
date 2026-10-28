
class otpHelper {
  async otpGenrator() {
    return Math.floor(Math.random() * 9000 + 1000);
  }
//   async otpValidate(){
//     let dbOtp = await 
//   }

}

module.exports = { otpGenerator };
