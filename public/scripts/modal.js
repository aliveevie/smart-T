// Get references to the modal and registration button;



function handleSubmit(){
    document.addEventListener('submit', async (e) => {
      //  e.preventDefault();
        const modalWindow = document.getElementById('modal-window');
        modalWindow.style.display = 'block';
        document.body.style.overflowY = 'hidden';
    });
}

async function handleClick(){
        const code = document.getElementById('verificationCode').value
        const token = fetch('/api/token').then(response => response.json());
        const data = await token;
        
        if(code == data.code){
            window.location.href = './dashboard.html'
        }else{
            const invalid = document.getElementById('invalid');
            invalid.style.display = 'block';
        }
}



