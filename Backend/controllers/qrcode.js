const multer = require("multer");
const QRCODE=require('../models/qrcodeModel')
const { randomString } = require("./../global/randomFunction");


const multerImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/qrcode");
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

const uploadQr = multer({
    storage: multerImageStorage,
    fileFilter: multerImageFilter,
  });

exports.qrupload = uploadQr.single("qrcode")
exports.getqr=async (req,res,next)=>{
    console.log('hello')
    let qrimage=await QRCODE.find({})
    if(!qrimage[0].qrcode){
      console.log('image not available')
      res.json({message:'image not found'})
    }
    console.log(qrimage)
    res.json(qrimage[0])
}

exports.qrcode=async (req,res,next)=>{
    console.log('bye')
    
    let qrcode=await QRCODE.findOne({})
    if(!qrcode){
      QRCODE.create({qrcode:"/public/qrcode/" + req.file.filename})
      res.json({message:'image uploaded successfully'})
    }
    qrcode.qrcode="/public/qrcode/" + req.file.filename
    qrcode.save()
    res.json({message:'image uploaded successfully'})
}

