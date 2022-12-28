const express = require("express");
const router = express.Router();
const {uploadExl,getTutorials,download} = require("../controller/excelimport");
const upload = require("../middleware/middleware");


  router.post("/uploadexcel", upload.single("file"), uploadExl);
  
  router.get("/tutorials", getTutorials);

  router.get("/download", download);

module.exports = router;
