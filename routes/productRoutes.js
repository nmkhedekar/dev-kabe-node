const express = require("express");
const { getAllProducts, getProduct, createTask, getTask, printFiles } = require("../controller/productController");

const router = express.Router();

router
.route("/")
.get(getAllProducts);

router
.route("/getProduct")
.get(getProduct);

router
.route("/task")
.post(createTask)
.get(getTask);

router
.route("/files")
.get(printFiles)

module.exports = router