
  // Get the current URL
  const params = new URLSearchParams(document.location.search);
  const school_id = params.get("school_id");
  const updateForm = document.getElementById('showUpdateForm');


  function getUpdateForm(){
    updateForm.style.display = 'block'
  }

  document.addEventListener('DOMContentLoaded', async () => {
    // Assuming school_id is defined before this point
    const url = `/api/schools/update?school_id=${school_id}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      
      console.log(responseData)

      document.getElementById('school-name').innerText = responseData[0].school_name;
      document.getElementById('principal').innerText = responseData[0].administrator;
      document.getElementById('phone').innerText = responseData[0].phone_number
      document.getElementById('totalteachers').innerText = responseData.number_of_teachers !== null ? responseData[0].number_of_teachers : 0;
      document.getElementById('totalstudents').innerText = responseData.number_of_students !== null ? responseData[0].number_of_students : 0;
      document.getElementById('totalclasses').innerText =  responseData.number_of_classes   !== null ? responseData[0].number_of_classes  : 0;
      updateForm.style.display = 'none';
      //console.log(responseData);
      // Do something with the responseData, e.g., update the UI
      const teachersList = document.getElementById('teacher-list');
      for(const data of responseData){
        const listItem = document.createElement('li');

        // Set the innerHTML of the li element with the data
        listItem.innerHTML = `
          <strong>ID:</strong> ${data.teacher_id} 
          <strong>Email:</strong> ${data.teacheremail}
          <strong>Name:</strong> ${data.teachername}
          <strong>Role:</strong> ${data.teacherrole}
          <strong>Subject:</strong> ${data.teachersubject}
          <a href="../views/teacher.html?teacher_id=${data.teacher_id}">View Teacher Dashboard</a>
        `;
      
        // Append the li element to the teacher-list
        teachersList.appendChild(listItem);
      }


    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., display an error message to the user
    }
  });

  function handleSubmit() {
  
    document.addEventListener('submit', async (e) => {
          e.preventDefault()
          
          const numTeachers = document.getElementById('numTeachers').value;
          const numStudents = document.getElementById('numStudents').value;
          const numClasses = document.getElementById('numClasses').value;
      
          //console.log(numTeacher, numStudents, numClasses)

      try {
        const response = await fetch('/api/schools/updatedata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numTeachers,
            numStudents,
            numClasses,
            school_id
          }),
        });
    
        const responseData = await response.json();

        if (response.ok) {
          // Handle success, e.g., show a success message
            location.reload(true);
        } else {
          // Handle error, e.g., show an error message
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    })
  }
  
  function handleTeachersManagement() {
  
    document.addEventListener('submit', async (e) => {
          e.preventDefault()
          const teacherName = document.getElementById('teacherName').value;
          const teacherPhone = document.getElementById('teacherPhone').value;
          const teacherEmail = document.getElementById('teacherEmail').value;
          const teacherRole = document.getElementById('teacherRole').value;
          const teacherSubject = document.getElementById('teacherSubject').value;
          const teacherClass = document.getElementById('teacherClass').value;
  
          //console.log(numTeacher, numStudents, numClasses)

      try {
        const response = await fetch('/api/schools/addteachers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            school_id,
            teacherName,
            teacherPhone,
            teacherEmail,
            teacherRole,
            teacherSubject,
            teacherClass
          }),
        });
    
        const responseData = await response.json();

        if (response.ok) {
          // Handle success, e.g., show a success message
            location.reload(true);
        } else {
          // Handle error, e.g., show an error message
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    })
  }


  function handleRemoveTeacher(){
    document.addEventListener('submit', async (e) => {
      e.preventDefault()
      const teacherName = document.getElementById('teacher-name').value;
      const teacherClass = document.getElementById('teacher-class').value;

      //console.log(numTeacher, numStudents, numClasses)

  try {
    const response = await fetch('/api/schools/removeteachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        school_id,
        teacherName,
        teacherClass
       
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Handle success, e.g., show a success message
        location.reload(true);
    } else {
      // Handle error, e.g., show an error message
      console.error('Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
})
  }
  
  

