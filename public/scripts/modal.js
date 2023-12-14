function getSchoolData(schoolData){
    return schoolData;
}

async function schoolDataUpdated(){
  return  await schoolData;
}

let schoolData;

function handleSubmit() {
  
  document.addEventListener('submit', async (e) => {
        e.preventDefault()
        const schoolName = document.getElementById('schoolName').value;
        const adminName = document.getElementById('adminName').value;
        const contact = document.getElementById('contact').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;
      
    try {
      const response = await fetch('/api/schools/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolName,
          adminName,
          contact,
          email,
          phone,
          address,
          password,
        }),
      });
  
      const responseData = await response.json();
      
      schoolData = getSchoolData(responseData);

      schoolDataUpdated();

      if (response.ok) {
        // Handle success, e.g., show a success message
        if (responseData.Error == 'Registered') {
          document.getElementById('error').innerText = 'School Already Registered!';
        } else {
          // Redirect to dashboard or handle as needed
          window.location.href = '../views/dashboard.html';
          document.getElementById('school-name').innerText = 'The Ibx School!';
        }
      } else {
        // Handle error, e.g., show an error message
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  })

  
}

async function handleClick() {
  const code = document.getElementById('verificationCode').value;
  const token = fetch('/api/token').then(response => response.json());
  const data = await token;

  if (code == data.code) {
    window.location.href = './dashboard.html';
  } else {
    const invalid = document.getElementById('invalid');
    invalid.style.display = 'block';
  }
}








