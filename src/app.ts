import { Response, Request } from "express";
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db');

app.use(express.static('public'));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });


  

app.listen(port, () => {
    console.log('Server is listening on port:',port);
});