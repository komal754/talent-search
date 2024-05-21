const express = require("express");
const {qrcode,qrupload,getqr}=require('../controllers/qrcode')
const {
  createForm,
  uploadUserPhoto,
  uploadUserVideo,
  saveVideo,
  getAllUsers,
  saveRRN,
  checktransaction,
  EmailSend,
  getDashboardData,
} = require("./../controllers/formController");
const router = express.Router();

router.post("/create", uploadUserPhoto, createForm);
router.post("/upload/:id", uploadUserVideo, saveVideo);
router.get("/getAll", getAllUsers);
router.put("/rrn/:id", saveRRN);
router.put("/approve/:id", checktransaction);
router.get("/dashboard", getDashboardData);
router.post("/sendEmail", EmailSend);
router.post('/qr',qrupload,qrcode);
router.get('/qr',getqr)
module.exports = router;
