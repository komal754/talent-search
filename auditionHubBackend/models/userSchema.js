// this schema only for admin...
const { model, Schema } = require("mongoose");
const userSchema = new Schema({
  userName: { type: String, default: "admin" },
  password: { type: String, default: "Admin@123" },
  email: { type: String, default: "admin@gmail.com" },
});

const user = model("user", userSchema);

module.exports = user;
