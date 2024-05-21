const { Schema, model } = require("mongoose");

// Define the schema for the form form
const qrSchema = new Schema(
  {
    qrcode:{type:String,required:true}
  }
);

// Create a mongoose model based on the schema
const QRCODE = model("QRCODE", qrSchema);

module.exports = QRCODE;
