const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (email, userType, userKey) => {
  const token = jwt.sign(
    {
      userType: userType,
      email: email,
    },
    userKey
  );

  return token;
};

exports.generateAccessToken = (email, userType) => {
  const token = jwt.sign(
    {
      userType: userType,
      email: email,
    },
    process.env.APP_TOKEN_KEY,
    { expiresIn: "48h" }
  );

  return token;
};
