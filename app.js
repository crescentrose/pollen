const express = require('express');
const getPollen = require('./pollen');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());
app.get('/pollen', (req, res) => {
  getPollen()
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send({error: "internal server error"});
    });
});

module.exports.handler = serverless(app);
