const express = require("express");
const multer  = require('multer')
const { adminmultiimage, getAdminImagesById } = require("../controller/adminController");

const router = express.Router();

const storageMulti = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, DIR);
        cb(null, picPath.join(picPath.dirname(__dirname), "adminImages"));
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, shortid.generate() + '-' + fileName)
    }
});

var uploadMulti = multer({
    storage: storageMulti,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
        }
    }
});

router.route("/postAdvertisement").post(uploadMulti.array('multiFile', 10), adminmultiimage);
router.route("/getAdminImagesById").post(getAdminImagesById);
