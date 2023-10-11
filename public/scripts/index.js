
const updateForm = document.getElementById('showUpdateForm');
const updateTeachers = document.getElementById('showTeachers');
const remove = document.getElementById("removeTeachers");
const showContinuous = document.getElementById("cont-ass");

function getUpdateForm(){
    updateForm.style.display = 'block'
}

function hideDetails(e){
    e.preventDefault();
    updateForm.style.display = 'none'
    updateTeachers.style.display = 'none'
    remove.style.display = 'none'
    showContinuous.style.display = 'none'
}


function showTeachers(){
    updateTeachers.style.display = 'block'
}

function removeTeacher(){
    remove.style.display = 'block'
}

function showContinousCa(){
    showContinuous.style.display = 'block'
}

document.addEventListener('submit', hideDetails);