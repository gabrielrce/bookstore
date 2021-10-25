const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  check("title")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Title should not be empty"),
  check("author")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Author should not be empty"),
  check("year")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Year should not be empty")
    .isInt({ min: 1454, max: new Date().getFullYear() })
    .withMessage(`Year should be between 1454 and ${new Date().getFullYear()}`),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate };
