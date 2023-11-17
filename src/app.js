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


app.post('/api/schools', async (req, res) => {
    const { schoolName, adminName, contact, email, phone, address, password } = req.body;
    
    const result = await db.query('SELECT school_id FROM schools_info WHERE email_address=$1', [email]);
    
    if(result.rows.length===0){
        db.query('INSERT INTO schools_info(tokens, school_name, administrator, contact_name, phone_number, email_address, school_address, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', 
        [code, schoolName, adminName, contact, email, phone, address, password])
        .then(() => {
          //  sendToken(email, schoolName, code)
         //   .then(() => console.log('Message Send Successifully!'));
        });
    }else{
        res.sendFile(path.resolve(__dirname, '../public/views', 'already.html'));
    }
});

app.get('/api/token', (req, res) => {
    res.json({ code: code });
});
  


app.listen(port, () => {
    console.log('Server is listening on port:',port);
});