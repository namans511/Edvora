const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (email, userId, userType, userKey) => {
  const token = jwt.sign(
    {
      userId: userId,
      userType: userType,
      email: email,
    },
    userKey
  );

  return token;
};

exports.generateAccessToken = (email, userType, userId) => {
  const token = jwt.sign(
    {
      userType: userType,
      email: email,
      userId: userId,
    },
    process.env.APP_TOKEN_KEY,
    { expiresIn: "48h" }
  );

  return token;
};
