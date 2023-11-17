const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db');
const bodyparser = require('body-parser');
const token = require('./functions/generateToken');
const sendToken = require('./functions/sendToken');
const code = token();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });


app.post('/api/schools', (req, res) => {
    const { schoolName, email } = req.body;
    sendToken(email, schoolName, code)
    .then(() => console.log('Message Send Successifully!'))
    
});

app.get('/api/token', (req, res) => {
    res.json({ code: code });
})
  

app.listen(port, () => {
    console.log('Server is listening on port:',port);
});