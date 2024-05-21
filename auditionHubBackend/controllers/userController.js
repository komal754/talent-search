const user = require("./../models/userSchema");

exports.login = async (req, res) => {
  try {
    const userName = req.body.userName;
    const data = await user.findOne({ userName });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }
    if (data.password !== req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Password Incorrect!...",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Login Successfull!..", user: data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const data = await user.findOne({ password: oldPassword });
    if (!data) {
      return res.status(400).json({
        success: false,
        message:
          "Old Password is not match the currect password!, please try again!..",
      });
    }
    data.password = newPassword;
    await data.save();
    res.status(200).json({
      success: true,
      message:
        "Password Changed!...",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
