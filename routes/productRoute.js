var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var {getFilterProduct}=require("../controller/productController")

router.get('/getFilterProduct/:short?/:gender?/:categories?/:brands?/:sizes?/:colors?/:price?', getFilterProduct);

module.exports = router;