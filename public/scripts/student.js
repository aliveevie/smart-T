const params = new URLSearchParams(document.location.search);
const student_id = params.get("student_id");

let examElements;
let caElements;
let totalElements;
let gradeElements;
let remarksElements;
let subjectElements;


let editScores = false;

function showAssessmentForm(){
  reportSheet.style.display = 'none';
  assessmentscores.style.display = 'block';

  examElements = document.querySelectorAll('#exam');
  caElements = document.querySelectorAll('#ca');
  totalElements = document.querySelectorAll('#total');
  gradeElements = document.querySelectorAll('#grades');
  remarksElements = document.querySelectorAll('#remarks');
  subjectElements = document.querySelectorAll('#subject-name');
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
                  <td  id="subject-name" name=${data.subject} >${data.subject}</td>
                  <td><input type='number' id='ca'      name='ca'    value=${parseFloat(data.ca)}></td>
                  <td><input type='number' id='exam'    name='exam'  value=${parseFloat(data.exam)}></td>
                  <td><input type='number' id='total'   name='total' value=${parseFloat(data.total)}></td>
                  <td><input type='text'   id='grades'   name='grades' value=${data.grade}></td>
                  <td><input type='text'   id='remarks' name='remarks' value=${data.remarks}></td>
                  
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

  function handledeleteSubject() {
  
    document.addEventListener('submit', async (e) => {
          e.preventDefault();
          const subject = document.getElementById('subjectName').value;
        
          //console.log(numTeacher, numStudents, numClasses)
  
      try {
        const response = await fetch('/api/schools/deletesubject', {
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

    document.addEventListener('submit', async (e) => {
      e.preventDefault();

      let resultData = {};
      let subjects_list = [];

      examElements.forEach(async (examElement, index) => {
        const caElement = caElements[index];
        const totalElement = totalElements[index];
        const examValue = parseFloat(examElement.value);
        const caValue = parseFloat(caElement.value);
        const grades = gradeElements[index];
        const remarks = remarksElements[index];
        const subjectelms = subjectElements[index];
        const subjects_name = subjectelms.innerText;
        
        
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
        }else if(totalMarks >= 70 ){
            grades.value = 'A'
            remarks.value = 'Excellent'
        }

        const grade_value = grades.value;
        const remark_value = remarks.value;

      
        resultData[subjects_name] = [{
            ca: caValue,
            exam: examValue,
            total: totalMarks,
            grades: grade_value,
            remarks: remark_value
        }];
        subjects_list.push(subjects_name);
            
        
    });

    const response = await fetch("/api/school/studentresults", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resultData,
        subjects_list,
        student_id
      }),
    });

    if(response.ok){
      location.reload(true);
    }


     
        
})
    
  
  

}




  