import * as net from "net";
import express from 'express';

var app = express();

app.get('/', (req, res, next) => {
  console.log('get route', req.testing);
  res.end();
});
 
app.listen(8082);