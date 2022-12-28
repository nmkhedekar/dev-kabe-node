var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var {FaqReg, FaqGet, FilterProducts}=require("../controller/faqController")

router.post('/faqReg', FaqReg);
router.post('/faqGet', FaqGet);
router.post('/filterProdGet', FilterProducts);


module.exports = router;