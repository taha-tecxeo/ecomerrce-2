const express=require('express');
const uploadMiddleware = require('../config/multer');
const router = express.Router();
const upload = uploadMiddleware("helloworld");



router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {

    return res.status(400).json({ error: "No file uploaded" });
  }


  console.log(req.file);

  const fileUrl = req.file.path; 
  

  res.status(200).json({ success: true, fileUrl: fileUrl });
});


module.exports = router;
