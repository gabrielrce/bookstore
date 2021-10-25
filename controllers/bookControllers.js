// Models
const { Book } = require("../models");
const { body, validationResult } = require("express-validator");

// Fecth all books
const getAll = (req, res) => {
  Book.getAll((books) => {
    res.send(books);
  });
};

// Get book by guid
const getByGuid = (req, res) => {
  const { guid } = req.params;
  const bookId = guid.slice(1);
  // Read all user
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find((el) => el.guid === bookId);

    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: "Ups!!! Book not found.",
      });
    }
  });
};

// Add new book
const createBook = (req, res) => {
  const { body } = req;
  // Create new instance
  const newBook = new Book(body);

  Book.getAll((books) => {
    // Filter by guid
    const existingBook = books.find((el) => el.title === newBook.getTitle() && el.author === newBook.getAuthor() && el.year === newBook.getYear());

    if (existingBook) {
      res.status(400).send({
        message: "Ups!!! Book already in DB.",
      });
    } else {
      newBook.save();
      res.send({
        message: "Book successfully created!!!",
        guid: newBook.getGuid(),
      });
    }
  });
};

// Update an existing book
const updateBook = (req, res) => {
  const {
    params: { guid },
    body,
  } = req;
  const bookId = guid.slice(1);
  // Read all book
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find((el) => el.guid === bookId);

    if (book) {
      Object.assign(book, body);
      Book.update(books);
      res.send({
        message: "Book successfully updated!!!",
      });
    } else {
      res.status(404).send({
        message: "Ups!!! Book not found.",
      });
    }
  });
};

// Delete book
const deleteBook = (req, res) => {
  const { guid } = req.params;
  const bookId = guid.slice(1);

  // Read all books
  Book.getAll((books) => {
    // Filter by guid
    const bookIdx = books.findIndex((el) => el.guid === bookId);

    if (bookIdx !== -1) {
      books.splice(bookIdx, 1);
      Book.update(books);
      res.send({
        message: "Book successfully deleted!!!",
      });
    } else {
      res.status(404).send({
        message: "Ups!!! Book not found.",
      });
    }
  });
};

module.exports = {
  getAll,
  getByGuid,
  createBook,
  updateBook,
  deleteBook,
};
