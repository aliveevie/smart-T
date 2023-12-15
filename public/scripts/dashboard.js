
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
      document.getElementById('school-name').innerText = responseData.school_name;
      document.getElementById('principal').innerText = responseData.administrator;
      document.getElementById('phone').innerText = responseData.phone_number
      document.getElementById('totalteachers').innerText = responseData.number_of_teachers !== null ? responseData.number_of_teachers : 0;
      document.getElementById('totalstudents').innerText = responseData.number_of_students !== null ? responseData.number_of_students : 0;
      document.getElementById('totalclasses').innerText =  responseData.number_of_classes   !== null ? responseData.number_of_classes  : 0;
      updateForm.style.display = 'none'
      //console.log(responseData);
      // Do something with the responseData, e.g., update the UI
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
  
      
  
       // console.log(schoolData)
  
       
        if (response.ok) {
          // Handle success, e.g., show a success message
        
        } else {
          // Handle error, e.g., show an error message
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    })
  
  }
  
  
  

