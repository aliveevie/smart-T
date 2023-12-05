console.log("It's Working Fine!");


function handleSubmit() {
    document.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
    
      try {
        const response = await fetch('/api/schools/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          }),
        });

        const responseData = await response.json();

        if(responseData.Error=='Success'){
                    // Get the current page URL
            window.location.href = '../views/dashboard.html';

      }else{
            document.getElementById('error').innerText = responseData.Error;
      }
  
        if (response.ok) {
          // Handle success, e.g., show a success message
        
            
        } else {
          // Handle error, e.g., show an error message
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    });
}