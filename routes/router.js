//modules
const express = require("express");
const router = express.Router();

//resources
const { BookResources } = require("../resources");

//all routes
router.use("/books", BookResources);

module.exports = router;
