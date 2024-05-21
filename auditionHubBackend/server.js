require("dotenv").config();
const app = require("./app");
const { connect } = require("mongoose");

const port = process.env.PORT || 8000;
const DB = process.env.DB_URI;
console.log(DB);

connect(DB)
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err));

// ===============listening to the server...===============
app.listen(port, () => {
  console.log(`> server is running on ${port} port`);
});
