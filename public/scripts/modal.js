let schooldata;

const fetchSchoolId = data => data;

const updateSchoolData = data => {
  schooldata = data;
};

const handleSubmit = async () => {
  
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
    updateSchoolData(fetchSchoolId(responseData));

    if (response.ok) {
      // Handle success, e.g., show a success message
      if (responseData.Error == 'Registered') {
        document.getElementById('error').innerText = 'School Already Registered!';
      } else {
        // Redirect to dashboard or handle as needed
        window.location.href = '../views/dashboard.html';
      }
    } else {
      // Handle error, e.g., show an error message
      console.error('Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
};

const handleClick = async () => {
  const code = document.getElementById('verificationCode').value;
  const token = fetch('/api/token').then(response => response.json());
  const data = await token;

  if (code == data.code) {
    window.location.href = './dashboard.html';
  } else {
    const invalid = document.getElementById('invalid');
    invalid.style.display = 'block';
  }
};

document.addEventListener('submit', handleSubmit);
const getSchoolData = () => {
  return new Promise(resolve => {
    // Use setInterval to check if schooldata is defined every 100 milliseconds
    const intervalId = setInterval(() => {
      if (schooldata !== undefined) {
        clearInterval(intervalId);
        resolve(schooldata);
      }
    }, 100);
  });
};

export default getSchoolData;
