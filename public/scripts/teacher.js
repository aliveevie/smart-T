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
    
    console.log(responseData);

    document.getElementById('class-name').innerText = responseData[0].teacherclass;
    document.getElementById('form-master').innerText = responseData[0].teachername;
    document.getElementById('phone').innerText = responseData[0].teacherphone;
  //  document.getElementById('totalteachers').innerText = responseData.number_of_teachers !== null ? responseData[0].number_of_teachers : 0;
  //  document.getElementById('totalstudents').innerText = responseData.number_of_students !== null ? responseData[0].number_of_students : 0;
  //  document.getElementById('totalclasses').innerText =  responseData.number_of_classes   !== null ? responseData[0].number_of_classes  : 0;
    updateForm.style.display = 'none';
    //console.log(responseData);
    // Do something with the responseData, e.g., update the UI
  //  const teachersList = document.getElementById('teacher-list');
  /*
  *
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
*/

  } catch (error) {
    console.error('Error:', error);
    // Handle the error, e.g., display an error message to the user
  }
});
