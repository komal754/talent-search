const { Schema, model } = require("mongoose");

// Define the schema for the form form
const formSchema = new Schema(
  {
    fullName: String,
    reference: String,
    fhName: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    sex: String,
    email: String,
    phone: String,
    height: String,
    width: String,
    complexion: String,
    city: String,
    state: String,
    country: String,
    pinCode: String,
    address: String,
    auditionCategory: String,
    pastExperience: String,
    pastAchievement: String,
    videoFile: String,
    rrn: String,
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

// Create a mongoose model based on the schema
const form = model("form", formSchema);

module.exports = form;
