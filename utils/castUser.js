const Student = require("../models/student");
const Teacher = require("../models/teacher");

module.exports = (userType) => {
  if (userType == "student") return Student;
  else return Teacher;
};
