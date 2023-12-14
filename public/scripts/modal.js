class SchoolRegistration {
  constructor() {
    this.schooldata = null;
    this.init();
  }

  fetchSchoolId(data) {
    // Assuming this function remains unchanged
    return data;
  }

  updateSchoolData(data) {
    this.schooldata = data;
  }



  

  async handleSubmit(e) {
    e.preventDefault();

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
      this.schooldata = this.fetchSchoolId(responseData);

      if (response.ok) {
        if (responseData.Error === 'Registered') {
          document.getElementById('error').innerText = 'School Already Registered!';
        } else {
          if (this.schooldata) {
         window.location.href = '../views/dashboard.html';
            
          }
        }
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
    this.getSchoolName()
    this.getEmail()
  }

  handleClick() {
    const code = document.getElementById('verificationCode').value;
    fetch('/api/token')
      .then(response => response.json())
      .then(data => {
        if (code === data.code) {
          window.location.href = './dashboard.html';
        } else {
          const invalid = document.getElementById('invalid');
          invalid.style.display = 'block';
        }
      });
  }

  getEmail() {
    const emailElement = document.getElementById('email');
    return emailElement ? emailElement.value : null;
  }

  getSchoolName() {
    const schoolNameElement = document.getElementById('schoolName');
    return schoolNameElement ? schoolNameElement.value : null;
  }
    

  init() {
      document.addEventListener('submit', this.handleSubmit.bind(this));
  }
}


const schoolRegistration = new SchoolRegistration();