const params = new URLSearchParams(document.location.search);
const student_id = params.get("student_id");
console.log(student_id)

document.addEventListener('DOMContentLoaded', async () => {
    // Assuming school_id is defined before this point
    const url = `/api/schools/studentupdate?student_id=${student_id}`;
  
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

      
            document.getElementById('student-name').innerText = responseData[0].student_name;
            document.getElementById('student').innerText = responseData[0].student_name;
            document.getElementById('reg-num').innerText = responseData[0].student_reg_number;
          //  document.getElementById('phone').innerText = responseData[0].teacherphone;
          //  document.getElementById('totalStudents').innerText = responseData.number_of_subjects !== null ? responseData[0].number_of_subjects : 0;
          //  document.getElementById('totalSubjects').innerText = responseData.number_of_students !== null ? responseData[0].number_of_students : 0;
          //  document.getElementById('numBoys').innerText = responseData.number_of_boys !== null ? responseData[0].number_of_boys : 0;
           // document.getElementById('numGirls').innerText =  responseData.number_of_girls   !== null ? responseData[0].number_of_girls  : 0;
           // updateForm.style.display = 'none';
            //console.log(responseData);
            // Do something with the responseData, e.g., update the UI
           // const studentsList = document.getElementById('student-list');
  
    /*
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
 */
  
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., display an error message to the user
    }
  });


  function handleUpdateSubject() {
  
    document.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          
          const subject = document.getElementById('subject').value;
          console.log(subject)
      
          //console.log(numTeacher, numStudents, numClasses)
  
      try {
        const response = await fetch('/api/schools/addsubjects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id,
            subject
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