const College = require("../models/college");

const collegeList = require("../utils/college-list");

exports.listColleges = (req, res, next) => {
  College.find()
    .select("name -_id")
    // .select("-_id")
    .then((list) => {
      // console.log(doc);
      res.status(200).json({
        list,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateColleges = (req, res, next) => {
  let list = [];
  for (const code in collegeList) {
    if (collegeList.hasOwnProperty(code)) {
      const college = collegeList[code];
      let obj = {
        code: code,
        name: college,
      };
      list.push(obj);
    }
  }
  College.insertMany(list)
    .then((doc) => {
      res.status(200).json({
        message: "hoagaya bhai",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
