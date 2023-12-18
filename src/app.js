const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db')
const bodyparser = require('body-parser');
const token = require('./functions/generateToken');
//const sendToken = require('./functions/sendToken');
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
    
    console.log(result.rows[0]);

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
    
    const result = await db.query('SELECT school_id, email_address, password FROM schools_info WHERE email_address=$1 AND password=$2', 
    [email, password]);

   
    if(result.rows.length==0){
        res.json({ Error: 'Error'});
        return;
    }else{
        if((result.rows[0].password==password)  && result.rows[0].email_address==email){
            res.json({school_id:result.rows[0].school_id});
            return;
        }else{
            res.json({ Error: 'Error' });
            return;
        }
    }
})


app.get('/api/token', (req, res) => {
    res.json({ code: code });
});

app.get('/api/schools/update', async (req, res) => {
    const { school_id } = req.query;
    console.log(school_id)
   
   
    const result = await db.query(
    `SELECT
      schools_info.school_name,
      schools_info.administrator,
      schools_info.phone_number,
      update_school_info.number_of_teachers,
      update_school_info.number_of_students,
      update_school_info.number_of_classes,
      add_teacher.teacher_id,
      add_teacher.teachername,
      add_teacher.teacherphone,
      add_teacher.teacheremail,
      add_teacher.teacherrole,
      add_teacher.teachersubject
    FROM
      schools_info
    JOIN
      update_school_info ON schools_info.school_id = update_school_info.school_id
    JOIN
      add_teacher ON schools_info.school_id = add_teacher.school_id
    WHERE
      schools_info.school_id = $1`
  , [school_id]);
  
    if(result.rows.length===0){
      await db.query('INSERT INTO update_school_info(school_id) VALUES($1)', 
      [school_id])
      .then(async () => {
          await  db.query(` SELECT
          schools_info.school_name,
          schools_info.administrator,
          schools_info.phone_number,
          update_school_info.number_of_teachers,
          update_school_info.number_of_students,
          update_school_info.number_of_classes,
          add_teacher.teacher_id,
          add_teacher.teachername,
          add_teacher.teacherphone,
          add_teacher.teacheremail,
          add_teacher.teacherrole,
          add_teacher.teachersubject
        FROM
          schools_info
        JOIN
          update_school_info ON schools_info.school_id = update_school_info.school_id
        JOIN
          add_teacher ON schools_info.school_id = add_teacher.school_id
        WHERE
          schools_info.school_id = $1
            `, [school_id])
            .then((data) => res.json(data.rows))
      });

   
      
    }else{
        res.json(result.rows);
        return;
    }
});

app.post('/api/schools/updatedata', async (req, res) => {
    const { numTeachers, numStudents, numClasses, school_id } = req.body;

   

    const result = await db.query(`
    UPDATE 
        update_School_info
    SET 
        number_of_teachers = $1,
        number_of_students = $2,
        number_of_classes  = $3
    WHERE
        school_id = $4
    RETURNING *
    `, [numTeachers, numStudents, numClasses, school_id])
    .then(() => res.json({Update: 'Success'}));
});
app.post('/api/schools/addteachers', async (req, res) => {
  const {
      school_id,
      teacherName,
      teacherPhone,
      teacherEmail,
      teacherRole,
      teacherSubject,
      teacherClass
  } = req.body;

  try {
      const result = await db.query(`
          INSERT INTO add_teacher (
              school_id,
              teacherName,
              teacherPhone,
              teacherEmail,
              teacherRole,
              teacherSubject,
              teacherClass
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [school_id, teacherName, teacherPhone, teacherEmail, teacherRole, teacherSubject, teacherClass]);

      res.json({ success: true });
  } catch (error) {
      console.error('Error during teacher insertion:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/schools/classupdate', async (req, res) => {
      const { teacher_id } = req.query;

    //   update_school_info ON schools_info.school_id = update_school_info.school_id

      const result = await db.query(
        ` SELECT 
              * 
          FROM 
              add_teacher AS at
          JOIN
              update_class_info AS uci ON at.teacher_id = uci.teacher_id
          JOIN 
              add_student AS st ON at.teacher_id = st.teacher_id
          WHERE
              at.teacher_id = $1;
            `,
        [teacher_id]
      ).then((data) => res.json(data.rows))
})

app.post('/api/schools/updateclassinfo', async (req, res) => {
 const {
    numStudents,
    numSubjects,
    numBoys,
    numGirls,
    teacher_id
  } = req.body

  
  const result = await db.query(`
    SELECT school_id FROM add_teacher WHERE teacher_id=$1
  `, [teacher_id]);

  const school_id = await result.rows[0].school_id;
  
  const updateClass = await db.query(`
        INSERT INTO 
            update_class_info(teacher_id, school_id, number_of_boys, number_of_girls, number_of_subjects, number_of_students)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
        `, [teacher_id, school_id, numBoys, numGirls, numSubjects, numStudents])
        .then((data) => res.json({Success: "Success"}))
})

app.post('/api/schools/addstudents/', async (req, res) => {
    const  { 
        studentName,
        regNumber, 
        gender,
        homeTown,
        teacher_id
      } = req.body;

      const result = await db.query(
        `SELECT 
            uci.class_id,
            uci.school_id
        FROM 
            add_teacher AS at
        JOIN
            update_class_info AS uci ON at.teacher_id = uci.teacher_id
        WHERE
            at.teacher_id = $1;
    
            `,
        [teacher_id]
      )
      const { class_id, school_id } = await result.rows[0];
//  student_name | student_reg_number | gender | home_town 

      const insertStudent = await db.query(`
          INSERT INTO 
            add_student(class_id, teacher_id, school_id, student_name, student_reg_number, gender, home_town)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7)
        `, [class_id, teacher_id, school_id, studentName, regNumber, gender, homeTown])
        .then(() => res.json({Success: "Success"}))
})

app.get('/api/schools/studentupdate', async (req, res) => {
        const { student_id } = req.query;

//  subject   | ca | exam | total | grade | remarks

        const result = await db.query(`
            SELECT 
                ads.student_id,
                ads.student_name,
                ads.student_reg_number,
                adt.subject,
                adt.ca,
                adt.exam,
                adt.total,
                adt.grade,
                adt.remarks,
                at.teacherclass 
            FROM 
                add_student AS ads
            JOIN
                add_subject AS adt ON ads.student_id = adt.student_id
            JOIN
                add_teacher AS at ON at.teacher_id = ads.teacher_id
            WHERE
                ads.student_id=$1
          `, [student_id])
          .then((data) => res.json(data.rows))
});


app.post('/api/schools/addsubjects', async (req, res) => {
        const { student_id, subject } = req.body;

        const result = await db.query(`
            SELECT
                class_id, teacher_id, school_id
            FROM
                add_student
            WHERE
                student_id=$1
            `, [student_id])

            const { class_id, teacher_id, school_id } = await result.rows[0]
            
            const insert = await db.query(`
              INSERT INTO 
                  add_subject(student_id, class_id, teacher_id, school_id, subject)
              VALUES($1, $2, $3, $4, $5)
            `, [student_id, class_id, teacher_id, school_id, subject])
            .then(() => res.json({Success: 'Success'}))
});

app.post('/api/schools/deletesubject', async (req, res) => {
    const { student_id, subject } = req.body;

    const deletsubject = await db.query(`
            DELETE
            FROM add_subject
            WHERE
                student_id = $1
            AND
                subject = $2
    `, [student_id, subject])
    .then((data) => res.json({data: "Success"}))
})


app.post("/api/school/studentresults", async (req, res) => {
    /*
            caValue: 12,
            examValue: 4,
            totalMarks: '16',
            grade_value: 'F',
            remark_value: 'Fail'
/           subject | ca | exam | total | grade |  remarks 
    */
const { student_id, subjects_list, resultData } = req.body;

for (const subject of subjects_list) {
  const data = resultData[subject];

  for (const item of data) {
    const result = await db.query(`
      UPDATE add_subject
      SET
        ca = $1,
        exam = $2,
        total = $3,
        grade = $4,
        remarks = $5
      WHERE
        student_id = $6
        AND subject = $7
    `, [item.ca, item.exam, item.total, item.grades, item.remarks, student_id, subject])
    .then((data) => {
      // Handle the success response
      
    })
   
  } 
}
// Send the success response outside the loop, once all updates are done
    res.json({ success: 'Success' });  
});

app.post('/api/schools/removeteachers', async (req, res) => {
       const { school_id, teacherName } = req.body;

       const result = db.query(`
        DELETE FROM add_teacher
        WHERE school_id = $1 AND teacherName = $2
       `, [school_id, teacherName]).then((data) => res.json({succes: 'Success'}))
});

app.listen(port, () => {
    console.log('Server is listening on port:',port);
});