const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (email, userKey) => {
  const token = jwt.sign(
    {
      email: email,
    },
    userKey
  );

  return token;
};

exports.generateAccessToken = (email) => {
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.APP_TOKEN_KEY,
    { expiresIn: "1h" }
  );

  return token;
};
