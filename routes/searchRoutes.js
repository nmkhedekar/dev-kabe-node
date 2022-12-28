const express = require("express");

const {
    getSearchResultController,
    generateImageController,
    autoCompletion,
    spellChecker,
    createModeration
} = require("../controller/searchController");

const router = express.Router();

router
    .route("/getSearchResult")
    .post(getSearchResultController);

router
    .route("/generateImage")
    .post(generateImageController);

router
    .route("/createCompletion")
    .post(autoCompletion);

router
    .route("/createEdit")
    .post(spellChecker);

router
    .route("/createModeration")
    .post(createModeration);

module.exports = router;