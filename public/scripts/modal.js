// Get references to the modal and registration button
const token = 9807;

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const modalWindow = document.getElementById('modal-window');
    modalWindow.style.display = 'block';
    document.body.style.overflowY = 'hidden';
});

function handleClick(){

        const code = document.getElementById('verificationCode').value
       console.log(code)
        if(code == token){
            window.location.href = './dashboard.html'
        }else{
            const invalid = document.getElementById('invalid');
            invalid.style.display = 'block';
        }
}


