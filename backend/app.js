const express = require('express')
const app = express()
const port = 3001
const DB = require('./db.js')
let myDB = new DB()
const cors = require('cors');

app.use(cors({
    origin: 'http://leetcoderandom.com'
}));
app.get('/problem', async (req, res) => {
  difficulties = req.headers['difficulties']
  acceptance = req.headers['acceptance']
  topics = req.headers['topics']
  premium = req.headers['premium']
  console.log("Query received: ",difficulties,acceptance,topics,premium);
  response = null
  if (topics.length > 0) {
    response = await myDB.getRandomTag(difficulties,acceptance,topics,premium);
  }

  else {
    response = await myDB.getRandomUnique(difficulties,acceptance,premium);
  }
  res.json(response);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
