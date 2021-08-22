require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
// database
const database = require("./databse");
// init express
const bucky = express();
bucky.use(bodyParser.urlencoded({ extended: true }));
bucky.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established"));

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
// post
// post book
/*
route         /book/new
description   add new book
access        public
parameter     none
methods       post
*/
bucky.post("/book/new", (req, res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({ updatedBooks: database.books });
});

// post author
/*
route         /author/new
description   add new author
access        public
parameter     none
methods       post
*/
bucky.post("/author/new", (req, res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({ updatedBooks: database.author });
});

/*
route         /pubs/new
description   add new pubs
access        public
parameter     none
methods       post
*/
// post pubs
bucky.post("/pubs/new", (req, res) => {
  const newPublication = req.body;
  database.publications.push(newPublication);
  return res.json({ updatedpublications: database.publications });
});
/*
route         /publication/update/book/
description   add new pubs
access        public
parameter     isbn
methods       post
*/
// put -update details of books if changed

bucky.put("/publication/update/book/:isbn", (req, res) => {
  // to update publication database
  database.publications.forEach((pub) => {
    // in database of publication the code checks with the given id of publication and if its found it pushes the params to books object of publications
    if (pub.id === req.body.pubid) {
      return pub.books.push(req.params.isbn);
    }
  });
  // to update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      database.books.publications === req.body.pubid;
    }
  });
  return res.json({
    books: database.books,
    publications: database.publications,
    message: "database succesfully updated",
  });
});
// delete
//  to delete a book
/*
route         /book/delete
description   delete a book
access        public
parameter     isbn
methods       delete
*/

bucky.delete("/book/delete/:isbn", (req, res) => {
  // move the other isbn to updated database and filter the match
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
  database.books = updatedBookDatabase;
  return res.json({ books: database.books });
});
// to delete a author from a book and vice versa
/*
route         /book/delete/author
description   delete a book
access        public
parameter     isbn,authorid
methods       delete
*/
// to update book database
bucky.delete("/book/delete/author/:isbn/:authorid", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorid)
      );
      book.author = newAuthorList;
      return;
    }
  });

  // to update author database
  database.author.forEach((eachAuthor) => {
    if (eachAuthor.id === parseInt(req.params.authorid)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;
    }
    return;
  });
  return res.json({
    book: database.books,
    author: database.author,
    messsage: "author was deleted",
  });
});

// port
bucky.listen(3000, () => {
  console.log("it's fine");
});
