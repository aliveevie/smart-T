const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db');
const bodyparser = require('body-parser');
const token = require('./functions/generateToken');
const sendToken = require('./functions/sendToken');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });


app.post('/api/schools', (req, res) => {
    console.log(req.body);
});
  

app.listen(port, () => {
    console.log(token());
    console.log('Server is listening on port:',port);
});