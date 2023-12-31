const params = new URLSearchParams(document.location.search);
const teacher_id = params.get("teacher_id");


const updateForm = document.getElementById('showUpdateForm');


function getUpdateForm(){
  updateForm.style.display = 'block'
}

document.addEventListener('DOMContentLoaded', async () => {
  // Assuming school_id is defined before this point
  const url = `/api/schools/classupdate?teacher_id=${teacher_id}`;

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

    const lastIndex = await responseData.length;
    
    console.log(responseData);

    document.getElementById('class-name').innerText = responseData[0].teacherclass;
    document.getElementById('form-master').innerText = responseData[0].teachername;
    document.getElementById('phone').innerText = responseData[0].teacherphone;
    document.getElementById('totalStudents').innerText = responseData.number_of_subjects !== null ? responseData[0].number_of_subjects : 0;
    document.getElementById('totalSubjects').innerText = responseData.number_of_students !== null ? responseData[0].number_of_students : 0;
    document.getElementById('numBoys').innerText = responseData.number_of_boys !== null ? responseData[lastIndex - 1].number_of_boys : 0;
    document.getElementById('numGirls').innerText =  responseData.number_of_girls   !== null ? responseData[lastIndex - 1].number_of_girls  : 0;
    updateForm.style.display = 'none';
    //console.log(responseData);
    // Do something with the responseData, e.g., update the UI
   const studentsList = document.getElementById('student-list');

  
  for(const data of responseData){
      const listItem = document.createElement('li');

      // Set the innerHTML of the li element with the data
      listItem.innerHTML = `
        <strong>ID:</strong> ${data.student_id} 
        <strong>Name:</strong> ${data.student_name}
        <strong>Reg Number:</strong> ${data.student_reg_number}
        <strong>Home Town:</strong> ${data.home_town}
        <a href="../views/student.html?student_id=${data.student_id}">View Student Dashboard</a>
      `;
    
      // Append the li element to the teacher-list
      studentsList.appendChild(listItem);
    }


  } catch (error) {
    console.error('Error:', error);
    // Handle the error, e.g., display an error message to the user
  }
});

function handleUpdateClass() {
  
  document.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const numStudents = document.getElementById('numStudents').value;
        const numSubjects = document.getElementById('numSubjects').value;
        const numBoys = document.getElementById('num-boys').value;
        const numGirls = document.getElementById('num-girls').value;
    
      

    try {
      const response = await fetch('/api/schools/updateclassinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numStudents,
          numSubjects,
          numBoys,
          numGirls,
          teacher_id
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

function handleAddStudents() {
  
  document.addEventListener('submit', async (e) => {
        e.preventDefault()
        const studentName = document.getElementById('studentName').value;
        const regNumber = document.getElementById('regNumber').value;
        const gender = document.getElementById('gender').value;
        const homeTown = document.getElementById('homeTown').value;
       
        //console.log(numTeacher, numStudents, numClasses)

    try {
      const response = await fetch('/api/schools/addstudents/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          regNumber,
          gender,
          homeTown,
          teacher_id
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





