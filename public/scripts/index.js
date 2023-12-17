
const updateTeachers = document.getElementById('showTeachers');
const remove = document.getElementById("removeTeachers");
const showContinuous = document.getElementById("cont-ass");
const showAddSubjects = document.getElementById('add-subject');
const deleteSubjects = document.getElementById('delete-subject');
const reportSheet = document.getElementById('showReportSheet');

const showScores = document.getElementById('showSubjects');
const assessmentscores = document.getElementById('Assessment-form');
const call_attance = document.getElementById('call-student');
const show_attandance = document.getElementById('show-attandance');


function hideDetails(e){
    e.preventDefault();
    updateForm.style.display = 'none'
    updateTeachers.style.display = 'none'
    remove.style.display = 'none'
    showContinuous.style.display = 'none'
    showAddSubjects.style.display = 'none'
    deleteSubjects.style.display = 'none'
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

function handleAddSubject(){
    showAddSubjects.style.display = 'block'
}

function handleRemoveSubject(){
    deleteSubjects.style.display = 'block'
}

function handleAssessment(){
    reportSheet.style.display = 'block';
    showContinuous.style.display = 'none';
}



function hideAssessmentForm(){
    reportSheet.style.display = 'block';
    assessmentscores.style.display = 'none';
}

function printStudentCA(){
    window.print()
}

function callAttandance(){
    call_attance.style.display = 'block'
}

function handleAttanceCall(){
    if(call_attance.style.display =='block'){
        show_attandance.style.display = 'block'
        call_attance.style.display = 'none'
    }
}

// document.addEventListener('submit', hideDetails);