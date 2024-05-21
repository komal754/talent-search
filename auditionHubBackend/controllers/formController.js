const form = require("./../models/formSchema");
const multer = require("multer");
const { randomString } = require("./../global/randomFunction");
const sendEmail = require("./../global/sendEmail");
//cb means callbackfunction
const multerImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // userName+useId+currenttimeStamp+fileExtenssion
    // ext meaning is fileExtenssion like png, jpeg
    const ext = file.mimetype.split("/")[1];
    const newString = randomString(6);
    cb(null, `user-${newString}-${Date.now()}.${ext}`);
  },
});

const multerImageFilter = (req, file, cb) => {
  // for checking the file type is desired or not..
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not An Image, please upload an iamge!.."), false);
  }
};

const multerVideoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/videos");
  },
  // Change the destination folder as needed
  filename: (req, file, cb) => {
    // userName+useId+currenttimeStamp+fileExtenssion
    // ext meaning is fileExtenssion like mp4,webm,mkv
    const ext = file.mimetype.split("/")[1];
    const newString = randomString(6);
    cb(null, `user-${newString}-${Date.now()}.${ext}`);
  },
});
const multerVideoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error("Not An Video, please upload an Video!.."), false);
  }
};

const uploadImage = multer({
  storage: multerImageStorage,
  fileFilter: multerImageFilter,
});

const uploadVideo = multer({
  storage: multerVideoStorage,
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter: multerVideoFilter,
});

// file uplaod functions....
// exports.uploadUserPhoto = uploadImage.single("image");
exports.uploadUserPhoto = uploadImage.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

exports.uploadUserVideo = uploadVideo.single("videoFile");

// ====== form creation function ======
exports.createForm = async (req, res) => {
  // console.log(req.body, req.file);
  try {
    const formData = req.body;
    console.log(req.files.image1);
    formData.image1 = "/public/images/" + req.files.image1[0].filename;
    formData.image2 = "/public/images/" + req.files.image2[0].filename;
    formData.image3 = "/public/images/" + req.files.image3[0].filename;
    formData.image4 = "/public/images/" + req.files.image4[0].filename;
    console.log(formData);
    const data = await form.create(formData);
    res
      .status(201)
      .json({ success: true, message: "form created succesfully!...", data });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "there was an error in creation of form",
    });
  }
};

exports.saveVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const formData = await form.findById(id);
    formData.videoFile = "/public/videos/" + req.file.filename;
    await formData.save();
    res
      .status(201)
      .json({ success: true, message: "form created succesfully!..." });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "there was an error in creation of form",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.query);
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = page > 1 ? (page - 1) * limit : 0;
    const users = await form
      .find({})
      .skip(skip)
      .limit(limit)
      .sort("-createdAt");
    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No Users Found in database",
      });
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.saveRRN = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await form.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!..." });
    }
    user.rrn = req.body.rrn || "";

    user.status = "pending";
    await user.save();

    //sending email....
    const email = user.email;
    const message =
      "Thank you for submitting your audition form. Your application is currently under review. We will notify you once the verification process is complete. Thank you for your patience.";
    sendEmail(
      email,
      "Audition Form Submission - Verification Pending",
      message
    );

    return res.status(200).json({
      success: true,
      message:
        "transaction in pending, wait until admin approve your transaction",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.checktransaction = async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.params.id;
    const data = await form.findById(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!.." });
    }
    data.status = status;
    await data.save();

    const message =
      status.trim() === "approved"
        ? "Great news! Your audition form has been approved. Congratulations! We look forward to having you on board."
        : "We regret to inform you that your audition form has not been approved at this time. Thank you for your interest, and we encourage you to try again in the future. If you have any questions, feel free to reach out.";
    const email = data.email;
    sendEmail(email, "Verified transaction", message);
    res
      .status(200)
      .json({ success: true, message: "Status Changed Succesfully!.." });
  } catch (err) {
    console.log(err.message);
    res
      .status(400)
      .json({ success: false, message: "SomeThing Went Wrong!..." });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const pendingUsers = await form.find({ status: "pending" });
    const approvedUsers = await form.find({ status: "approved" });
    const rejectedUsers = await form.find({ status: "reject" });
    const data = {
      pendingUsers: pendingUsers.length,
      approvedUsers: approvedUsers.length,
      rejectedUsers: rejectedUsers.length,
    };
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.log(err.message);
    res
      .status(400)
      .json({ success: false, message: "SomeThing Went Wrong!..." });
  }
};

exports.EmailSend = async (req, res) => {
  try {
    const message = req.body.message;
    const email = req.query.email;
    const subject = req.body.subject || "From AuditionHub";
    sendEmail(email, subject, message);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!..." });
  } catch (err) {
    console.log(err.message);
    res
      .status(400)
      .json({ success: false, message: "SomeThing Went Wrong!..." });
  }
};
