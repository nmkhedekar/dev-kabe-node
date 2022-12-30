const express = require("express");
const { syncProduct } = require("../controller/storeController");

const router = express.Router();

router
.route("/syncProduct")
.put(syncProduct);

module.exports = router;