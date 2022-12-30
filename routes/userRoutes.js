const express = require("express");

const {
    getUserHistory
} = require("../controller/userController");

const router = express.Router();

router
.route("/getUserHistory")
.get(getUserHistory);

module.exports = router;