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
    
    console.log(result.rows[0])

    if(result.rows.length==0){
       db.query( 'INSERT INTO schools_info(tokens, school_name, administrator, contact_name, phone_number, email_address, school_address, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING school_id, school_name, administrator, contact_name, phone_number, email_address, school_address', 
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

app.get('/api/schools/update', async (req, res) => {
    const { school_id } = req.query;

    const result = await db.query(`
    SELECT
      schools_info.school_name,
      update_school_info.number_of_teachers,
      update_school_info.number_of_students,
      update_school_info.number_of_classes
    FROM
      schools_info
    JOIN
      update_school_info ON schools_info.school_id = update_school_info.school_id
    WHERE
      schools_info.school_id = $1
  `, [school_id]);
  
    if(result.rows.length==0){
      await db.query('INSERT INTO update_school_info(school_id) VALUES($1)', 
      [school_id])
      .then(() => {
            db.query(`SELECT
            schools_info.school_name,
            update_school_info.number_of_teachers,
            update_school_info.number_of_students,
            update_school_info.number_of_classes
          FROM
            schools_info
          JOIN
            update_school_info ON schools_info.school_id = update_school_info.school_id
          WHERE
            schools_info.school_id = $1
            `, [school_id])
      })
      .then((data) => res.json(data.rows[0]));
    }else{
        res.json(result.rows[0]);
    }

});


app.listen(port, () => {
    console.log('Server is listening on port:',port);
});