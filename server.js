const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const port = 4336;

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send("Hello folks, this is for training purpose");
});

app.get('/table', (req, res) => {
  res.sendFile(path.resolve(__dirname +`/src/views/table.html`));
})

app.get('/hello-api', (req, res) => {
  const { name, age } = req.query;
  if(!name || !age) return res.status(400).send("Bad request");
  res.status(200).send({name: name, comment: (age >30) ? "You look younger than your age" : "Hello beautiful"});
});

app.post('/hello-api', (req, res) => {
  const { name, age } = req.body;
  if(!name || !age) return res.status(400).send("Bad request");
  res.status(200).send({name: name, comment: (age >30) ? "You look younger than your age" : "Hello beautiful"});
});

app.get('/hello', (req, res) => {
  res.sendFile(path.resolve(__dirname + `/src/views/hello.html`));
});

app.listen(port, () => console.log(`API running on PORT ${port}!`))