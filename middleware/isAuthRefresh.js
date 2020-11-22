const jwt = require("jsonwebtoken");
const castUser = require("../utils/castUser");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 502;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken, verifiedToken;
  try {
    decodedToken = jwt.decode(token);
  } catch (err) {
    err.statusCode = 403;
    throw err;
  }
  const email = decodedToken.email;
  const userType = decodedToken.userType;

  const UserType = castUser(userType);
  let key;
  UserType.findOne({ email: email })
    .then((user) => {
      if (!user) console.log("omg no user");
      key = user.userKey;
      req.email = user.email;
      req.userType = userType;
      req.userId = user._id;
      try {
        verifiedToken = jwt.verify(token, key);
      } catch (err) {
        err.statusCode = 502;
        throw err;
      }
      if (!verifiedToken) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
      }

      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
