const College = require("../models/college");
const Branch = require("../models/branch");
const Department = require("../models/department");


const collegeList = require("../utils/college-list");
const branchList = require("../utils/branch-list");
const departmentList = require("../utils/department-list");

exports.listColleges = (req, res, next) => {
  College.find()
    .select("name -_id")
    .then((list) => {
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

exports.listBranches = (req, res, next) => {
  Branch.find()
    .select("name -_id")
    .then((list) => {
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

exports.updateBranch = (req, res, next) => {
  let list = [];
  for (const code in branchList) {
    if (branchList.hasOwnProperty(code)) {
      const branch = branchList[code];
      let obj = {
        code: code,
        name: branch,
      };
      list.push(obj);
    }
  }
  console.log(list);
  Branch.insertMany(list)
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

exports.listDepartments = (req, res, next) => {
  Department.find()
    .select("name -_id")
    .then((list) => {
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

exports.updateDepartment = (req, res, next) => {
  let list = [];
  for (const code in departmentList) {
    if (departmentList.hasOwnProperty(code)) {
      const department = departmentList[code];
      let obj = {
        code: code,
        name: department,
      };
      list.push(obj);
    }
  }
  console.log(list);
  Department.insertMany(list)
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