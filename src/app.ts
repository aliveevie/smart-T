import { Response, Request } from "express";
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db');
const bodyparser = require('body-parser');
// const token = require('./mail');


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });


app.post('/api/schools', (req:Request, res:Response) => {
    console.log(req.body);
});
  

app.listen(port, () => {
    console.log('Server is listening on port:',port);
});