



let schoolData = [];

function waitAndLogSchoolData() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (schoolData.length > 0) {
        clearInterval(intervalId);
        resolve();
      }
    }, 100); // Adjust the interval based on your requirements
  });
};



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

      schoolData.push({
        name: responseData.administrator,
        email: responseData.email_address,
        phone: responseData.phone_number,
        school_id: responseData.school_id
      });

     // console.log(schoolData)

     
      if (response.ok) {
        // Handle success, e.g., show a success message
        if (responseData.Error == 'Registered') {
          document.getElementById('error').innerText = 'School Already Registered!';
        } else {
          // Redirect to dashboard or handle as needed
          window.location.href = `../views/dashboard.html?school_id=${responseData.school_id}`;
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



// ...
/*
*
function waitAndLogSchoolData() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (schoolData.length > 0) {
        clearInterval(intervalId);
        resolve();
     
        window.location.href = '../views/dashboard.html'.then(() => {
        document.getElementById('school-name').innerText = 'IBX Digital Schools!'
        });
      }
    }, 100); // Adjust the interval based on your requirements
  });
};

waitAndLogSchoolData()
*
*/


class Dashboard extends HTMLElement{
    constructor(){
      super();
    };

    connectedCallback(){
      this.innerHTML = `
    <header class="header-back" >
          <h1  id="school-name" ></h1>
          <div class="back-button" >
             <i class="fas fas-back" >Back</i>
          </div>
    </header>

    <section class="school-head" >
    <div class="head" >
        <h3>School Director/Principal/Admin</h3>
        <p id="principal" >Principal</p>
        <p id="phone" >070 000 0000</p>
    </div>
</section>
<section class="school-statistics">
    <h2>School Statistics</h2>
    <div class="school-info" >
        <div class="total-teachers" >
            <h3>Total Teachers</h3>
            <p id="totalteachers" >0</p>
        </div>
        <div class="total-teachers" >
            <h3>Total Students</h3>
            <p id="totalteachers" >0</p>
        </div>
        <div class="total-teachers" >
            <h3>Total Classes</h3>
            <p id="totalteachers" >0</p>
        </div>
    </div>
    <div class="button-stat" >
        <button class="buttons" onclick="getUpdateForm()" >Update School Information</button>
    </div>

</section>
      `
    }  
}


customElements.define('dashboard-element', Dashboard);








