const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 4336;

const book = require(__dirname + `/src/data/book.json`);



app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, `/src/views`));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send("Hello folks, this is for training purpose");
});

/* Different between post and get request
*/
app.post('/hello-api', (req, res) => {
  const { name, age } = req.body;
  if(!name || !age) return res.status(400).send("Bad request");
  res.status(200).send({name: name, comment: (age >30) ? "You look younger than your age" : "Hello beautiful"});
});

app.get('/hello-api', (req, res) => {
  const { name, age } = req.query;
  if(!name || !age) return res.status(400).send("Bad request");
  res.status(200).send({name: name, comment: (age >30) ? "You look younger than your age" : "Hello beautiful"});
});

//render hello
app.get('/hello', (req, res) => {
  const { name, age } = req.query;
  if(!name || !age) return res.status(400).send("Bad request");

  const data = {name: name, comment: (age >30) ? "You look younger than your age" : "Hello beautiful"};
  res.render('hello', {data: data});
});

//load books
app.get('/get-book-api', (req, res) => {
  //let rawdata = fs.readFileSync(__dirname + `/src/data/book.json`);
  //res.status(200).send(JSON.parse(rawdata));
  res.status(200).send(book);
})

//render table
app.get('/table', (req, res) => {
  res.render('table');
})

app.listen(port, () => console.log(`API running on PORT ${port}!`))