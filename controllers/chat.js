const Message = require("../models/message");

exports.getMessages = (req, res, next) => {
  const { roomname } = req.params;
  Message.findOne({ roomname: roomname })
    .then((msg) => {
      if (!msg) {
        throw new Error("room already exists");
      }
      res.status(200).json(msg);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
