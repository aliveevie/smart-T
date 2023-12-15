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

        console.log(responseData);
  
        if (response.ok) {
          // Handle success, e.g., show a success message
          if(responseData.Error=='Error'){
            // Get the current page URL
        document.getElementById('error').innerText = "Invalid Username or password";
      }else{
          window.location.href = `../views/dashboard.html?school_id=${responseData.school_id}`;
    }
            
        } else {
          // Handle error, e.g., show an error message
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    });
}