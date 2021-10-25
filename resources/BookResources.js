//modules
const express = require("express");
const BookResources = express.Router();
const { validateCreate } = require("../validators/books");

//controllers
const { BookControllers } = require("../controllers");

//All book resources

BookResources.get("/", BookControllers.getAll);
BookResources.post("/", validateCreate, BookControllers.createBook);
BookResources.get("/:guid", BookControllers.getByGuid);
BookResources.put("/:guid", validateCreate, BookControllers.updateBook);
BookResources.delete("/:guid", BookControllers.deleteBook);

module.exports = BookResources;
