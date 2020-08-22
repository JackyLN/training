const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const port = 4336;

const books = require(__dirname + `/src/data/book.json`);



app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, `/src/views`));
app.set('view engine', 'ejs');

app.use(session({
  //we use default store MemoryStore for developer purpose only
  secret: 'Training CRUD',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }, //set to true when using https
  maxAge: 24 * 1000 * 60 * 60		// 24 hour
}));

app.get('/', (req, res) => {
  res.send("Hello folks, this is for training purpose");
});

/* Different between post and get request
*/
app.post('/hello-api', (req, res) => {
  const { name, age } = req.body;
  if(!name || !age) return res.status(400).send("Bad request");
  res.status(200).send({name: name, comment: (age >30) ? "You look younger than your age" : "You're beautiful"});
});

app.get('/hello-api', (req, res) => {
  const { name, age } = req.query;
  if(!name || !age) return res.status(400).send("Bad request");
  res.status(200).send({name: name, comment: (age >30) ? "You look younger than your age" : "You're beautiful"});
});

//render hello
app.get('/hello', (req, res) => {
  const { name, age } = req.query;
  if(!name || !age) return res.status(400).send("Bad request");

  const data = {name: name, comment: (age >30) ? "You look younger than your age" : "You're beautiful"};
  res.render('hello', {data: data});
});

//load books
// in advance, you could seperate saving book to session and validation in a custom middleware, instead of checking in every route
app.get('/refresh-book', (req, res) => {
  const sess = req.session;
  sess.books = books.books; //due to 1 layer of object in json file
  res.status(200).send(sess.books);
});

//get all books
app.get('/get-books', (req, res) => {
  const {books} = req.session;
  if (!books) return res.status(404).send("You need to load book list first");

  res.status(200).send(books);
});

//get 1 book by isbn
app.get('/get-book-by-isbn', (req, res) => {
  const {books} = req.session;
  if (!books) return res.status(404).send("You need to load book list first");

  const { isbn } = req.query;
  if (!isbn) return res.status(400).send("Bad request");

  const book = books.find(e => e.isbn == isbn);

  if (!book) return res.status(404).send("Not found");

  return res.status(200).send(book);
})

//add 1 book
app.post('/add-book', (req, res) => {
  const {books} = req.session;
  if (!books) return res.status(404).send("You need to load book list first");

  const { isbn, title, subtitle, author, published, publisher, pages, description, website } = req.body;
  if(!isbn || !title) return res.status(400).send("ISBN and title is required");

  books.push({
    isbn: isbn, //required
    title: title, //required
    subtitle: subtitle === null ? undefined : subtitle,
    author: author === null ? undefined : author,
    published: published === null ? undefined : published,
    publisher: publisher === null ? undefined : publisher,
    pages: pages === null ? undefined : pages,
    description: description === null ? undefined : description,
    website: website === null ? undefined : website
  });

  res.status(200).send("OK");
});

//update 1 book
// PUT is idempotent, so if you PUT an object twice, it has no effect
app.put('/update-book', (req, res) => {
  const {books} = req.session;
  if (!books) return res.status(404).send("You need to load book list first");

  const { isbn, title, subtitle, author, published, publisher, pages, description, website } = req.body;
  if(!isbn || !title) return res.status(400).send("ISBN and title is required");

  books.find(e => {
    if(e.isbn == isbn) {
      e.title = title; //required
      e.subtitle = subtitle === null ? undefined : subtitle;
      e.author = author === null ? undefined : author;
      e.published = published === null ? undefined : published;
      e.publisher = publisher === null ? undefined : publisher;
      e.pages = pages === null ? undefined : pages;
      e.description = description === null ? undefined : description;
      e.website = website === null ? undefined : website;

      return true;
    }
    return false;
  });

  res.status(200).send("OK");
});

app.delete('/delete-book', (req, res) => {
  const {books} = req.session;
  if (!books) return res.status(404).send("You need to load book list first");

  const { isbn } = req.body;
  if(!isbn) return res.status(400).send("Bad request");

  const index = books.indexOf(e => e.isbn == isbn);
  if (index > -1) {
    array.splice(index, 1);

    return res.status(200).send("OK");
  }
  return res.status(404).send("Not found");
})

//render table
app.get('/table', (req, res) => {
  res.render('table');
})

app.listen(port, () => console.log(`API running on PORT ${port}!`))