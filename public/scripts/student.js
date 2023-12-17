const params = new URLSearchParams(document.location.search);
const student_id = params.get("student_id");
console.log(student_id);

let editScores = false;

function showAssessmentForm(){
  reportSheet.style.display = 'none';
  assessmentscores.style.display = 'block';
  editScores = true;
  console.log('You are clicking and not working!', editScores)
}

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
            document.getElementById('class').innerText = responseData[0].teacherclass;
          //  document.getElementById('totalStudents').innerText = responseData.number_of_subjects !== null ? responseData[0].number_of_subjects : 0;
          //  document.getElementById('totalSubjects').innerText = responseData.number_of_students !== null ? responseData[0].number_of_students : 0;
          //  document.getElementById('numBoys').innerText = responseData.number_of_boys !== null ? responseData[0].number_of_boys : 0;
           // document.getElementById('numGirls').innerText =  responseData.number_of_girls   !== null ? responseData[0].number_of_girls  : 0;
           // updateForm.style.display = 'none';
            //console.log(responseData);
            // Do something with the responseData, e.g., update the UI
           
            const reportSheets = document.getElementById('report-data');
            const editReport = document.getElementById('edit-report');
            const subjectList = document.getElementById('subject-list');

           
              for (const data of responseData) {

                const caElements = document.querySelectorAll('#ca');
                const examElements = document.querySelectorAll('#exam');
                const totalElements = document.querySelectorAll('#total');
                const gradeElements = document.querySelectorAll('#grade');
                const remarksElements = document.querySelectorAll('#remarks');

                console.log(caElements)

                const listItem = document.createElement('tr');
                const editItems = document.createElement('tr');
                const subjects = document.createElement('tr');
                // Set the innerHTML of the tr element with the data
                listItem.innerHTML = `
                  <td>${data.subject}</td>
                  <td>${data.ca}</td>
                  <td>${data.exam}</td>
                  <td>${data.total}</td>
                  <td>${data.grade}</td>
                  <td>${data.remarks}</td>
                `;
          
                editItems.innerHTML = `
                  <td>${data.subject}</td>
                  <td><input type='number' id='ca'      name='ca'    value='0'/></td>
                  <td><input type='number' id='exam'    name='exam'  value='0'/></td>
                  <td><input type='number' id='total'   name='total' value='0'/></td>
                  <td><input type='text'   id='grade'   name='grade' value='F'/></td>
                  <td><input type='text'   id='remarks' name='remarks' value='Fail'/></td>
                `;

                subjects.innerHTML = `
                    <td>${data.subject}</td>
                `
          
                // Append the tr element to the current reportSheet
                reportSheets.appendChild(listItem);
                editReport.appendChild(editItems);
                subjectList.appendChild(subjects);
               
              }
        
          
            editScores = true; 
  
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., display an error message to the user
    }
  });


  function handleUpdateSubject() {
  
    document.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          
          const subject = document.getElementById('subject').value;
        
      
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


  function handleResultCalculation() {
    console.log('You are clicking!')
    examElements.forEach((examElement, index) => {
        const caElement = caElements[index];
        const totalElement = totalElements[index];
        const examValue = parseFloat(examElement.value);
        const caValue = parseFloat(caElement.value);
        const grades = gradeElements[index];
        const remarks = remarksElements[index];
        
        totalElement.value = caValue + examValue;

        const totalMarks = totalElement.value;
        
        if(totalMarks <= 39){
            grades.value = 'F'
            remarks.value = 'Fail'
        }else if(totalMarks <= 49){
            grades.value = 'D'
            remarks.value = 'Fair'
        }else if(totalMarks <= 59){
            grades.value = 'C'
            remarks.value = 'Credit'
        }else if(totalMarks <= 69){
            grades.value = 'B'
            remarks.value = 'Very Good'
        }else if(totalMarks >= 70 && totalMarks <= 100 ){
            grades.value = 'A'
            remarks.value = 'Excellent'
        }
           
    });

}
