const express = require("express");
var bodyParser = require("body-parser");
// database
const database = require("./databse");
// init express
const bucky = express();
bucky.use(bodyParser.urlencoded({ extended: true }));
/*
route         /
description   get all the books
access        public
parameter     none
methods       get
*/
bucky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
route         /is
description   get the specific books
access        public
parameter     isbn
methods       get
*/
bucky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book has been found on the ISBN ${req.params.isbn}`,
    });
  }
  return res.json({ book: getSpecificBook });
});
/*
route         /c
description   get the specific category of books
access        public
parameter     category
methods       get
*/
bucky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book has been found on the given category ${req.params.category}`,
    });
  }
  return res.json({ book: getSpecificBook });
});
/*
route         /l/
description   get the specific language of books
access        public
parameter     language
methods       get
*/
bucky.get("/l/:language", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book has been found on the language ${req.params.language}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

/*
route         /author
description   get the all books of authors
access        public
parameter     none
methods       get
*/
bucky.get("/author", (req, res) => {
  return res.json({ author: database.author });
});

/*
route         /author/name/
description   get the books of specific author
access        public
parameter     id
methods       get
*/
bucky.get("/author/name/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  );
  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No book has been found on the author id ${req.params.id}`,
    });
  }
  return res.json({ author: getSpecificAuthor });
});

/*
route         /author/book/
description   get the books of list of author
access        public
parameter     isbn
methods       get
*/
bucky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `no books has been found for the author ${req.params.isbn}`,
    });
  }
  return res.json({ author: getSpecificAuthor });
});

/*
route         /pubs
description   get the books of all pubs
access        public
parameter     none
methods       get
*/
bucky.get("/pubs", (req, res) => {
  return res.json({ publications: database.publications });
});
/*
route         /pubs/publications/
description   get the specific pub based on the author 
access        public
parameter     id
methods       get
*/

bucky.get("/pubs/publications/:id", (req, res) => {
  const getSpecificpublication = database.publications.filter(
    (publications) => publications.id === parseInt(req.params.id)
  );
  if (getSpecificpublication.length === 0) {
    return res.json({
      error: `no book has been found on the pub id ${req.params.id}`,
    });
  }
  return res.json({ publications: getSpecificpublication });
});

/*
route         /pubs/publications/
description   get a list of pubs based on books   
access        public
parameter     id
methods       get
*/
bucky.get("/pubs/books/:isbn", (req, res) => {
  const getSpecificpublication = database.publications.filter((publications) =>
    publications.books.includes(req.params.isbn)
  );
  if (getSpecificpublication.length === 0) {
    return res.json({
      error: `no pubs has found in the books ${req.params.isbn}`,
    });
  }
  return res.json({ publications: getSpecificpublication });
});

// port
bucky.listen(3000, () => {
  console.log("it's fine");
});
