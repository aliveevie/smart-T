const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db')
const bodyparser = require('body-parser');
const token = require('./functions/generateToken');
const sendToken = require('./functions/sendToken');
const code = token();
// const bcrypt = require('bcrypt')


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });


app.post('/api/schools/register', async (req, res) => {
    const { schoolName, adminName, contact, email, phone, address, password } = req.body;
  
    //const hashedPassword = await bcrypt.hash(password, 10);
   // console.log(hashedPassword);


    const result = await db.query('SELECT school_id FROM schools_info WHERE email_address=$1', [email]);
      
    if(result.rows.length==0){
       db.query( 'INSERT INTO schools_info(tokens, school_name, administrator, contact_name, phone_number, email_address, school_address, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING tokens, school_name, administrator, contact_name, phone_number, email_address, school_address', 
        [code, schoolName, adminName, contact, phone, email, address, password])
         .then((data) => res.json(data.rows[0]))
         //sendToken(email, schoolName, code)

    }else{
        res.json({ Error: 'Registered' })
        return;
};

});


app.post('/api/schools/login', async (req, res) => {
    const { email, password } = req.body;
    
    
    const result = await db.query('SELECT email_address, password FROM schools_info WHERE email_address=$1 AND password=$2', 
    [email, password]);


    if(result.rows.length==0){
        res.json({ Error: 'Invalid Username or Password'});
        return;
    }else{
        if((result.rows[0].password==password)  && result.rows[0].email_address==email){
            res.json({ Error: 'Success' });
            return
        }else{
            res.json({ Error: 'Invalid Username or Password'});
            return;
        }
    }
})


app.get('/api/token', (req, res) => {
    res.json({ code: code });
});
  


app.listen(port, () => {
    console.log('Server is listening on port:',port);
});