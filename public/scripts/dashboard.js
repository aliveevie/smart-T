
  // Get the current URL
  let params = new URLSearchParams(document.location.search);
  let school_id = params.get("school_id");

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
      console.log(responseData);
      // Do something with the responseData, e.g., update the UI
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., display an error message to the user
    }
  });
  
  

