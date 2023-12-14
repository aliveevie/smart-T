
  // Get the current URL
  let params = new URLSearchParams(document.location.search);
  let school_id = params.get("school_id");

  document.addEventListener('DOMContentLoaded', () => {
    // Assuming school_id is defined before this point
    const url = `/api/schools/update?school_id=${school_id}`;
  
    const response = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // You might want to handle the response, for example:
    response.then((res) => {
      if (res.ok) {
        console.log('Request was successful');
      } else {
        console.error('Request failed');
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  });
  

