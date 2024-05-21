const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const formRouter = require("./routes/formRoute");
const userRouter = require("./routes/userRoute");
//===== code starts =========
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Serve static files from the 'public' directory
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cors());

// Development logging
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}

// route handling..
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

//====== route handling ========
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/form", formRouter);

//===== error handling =========
app.all("*", (req, res) => {
  res.sendFile(`${__dirname}/error.html`);
});

module.exports = app;
