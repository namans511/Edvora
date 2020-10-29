const otpGenerator = require("otp-generator");
const Otp = require("../models/otp");

module.exports = (email, userType) => {
  //generate otp
  let otp = otpGenerator.generate(4, {
    alphabets: false,
    specialChars: false,
    upperCase: false,
  });

  //saving the otp in database
  const userOtp = new Otp({
    otp: otp,
    email: email,
    userType: userType,
  });
  userOtp.save();

  console.log(email);
  console.log("otp=" + userOtp.otp);

  //TODO: send otp to user via email
  // Emails.sendOtpEmail(email, otp);

  return userOtp;
};
