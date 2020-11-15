// const AdminBro = require("admin-bro");
// const AdminBroExpress = require("@admin-bro/express");
// const AdminBroMongoose = require("@admin-bro/mongoose");
// const mongoose = require("mongoose");
const Student = require("../models/student");

// AdminBro.registerAdapter(AdminBroMongoose);
// const AdminBroOptions = {
//   databases: [mongoose],
//   rootPath: "/adminbro",
  // resources: [Student],
// };
// const adminBro = new AdminBro(AdminBroOptions);
// const router = AdminBroExpress.buildRouter(adminBro);

// module.exports = router;

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

const mongoose = require("mongoose");
AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/adminBro",
  resources: [Student],
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
