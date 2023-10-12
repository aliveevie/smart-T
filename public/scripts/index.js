
const updateForm = document.getElementById('showUpdateForm');
const updateTeachers = document.getElementById('showTeachers');
const remove = document.getElementById("removeTeachers");
const showContinuous = document.getElementById("cont-ass");
const showAddSubjects = document.getElementById('add-subject');
const deleteSubjects = document.getElementById('delete-subject');
const reportSheet = document.getElementById('showReportSheet');
const caElements = document.querySelectorAll('#ca');
const examElements = document.querySelectorAll('#exam');
const totalElements = document.querySelectorAll('#total');
const gradeElements = document.querySelectorAll('#grade');
const remarksElements = document.querySelectorAll('#remarks');
const showScores = document.getElementById('showSubjects');
const assessmentscores = document.getElementById('Assessment-form');




function getUpdateForm(){
    updateForm.style.display = 'block'
}

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

function showAssessmentForm(){
    reportSheet.style.display = 'none';
    assessmentscores.style.display = 'block';
}

function hideAssessmentForm(){
    reportSheet.style.display = 'block';
    assessmentscores.style.display = 'none';
}

function printStudentCA(){
    window.print()
}



function handleResultCalculation() {
    examElements.forEach((examElement, index) => {
        const caElement = caElements[index];
        const totalElement = totalElements[index];
        const examValue = parseFloat(examElement.value);
        const caValue = parseFloat(caElement.value);
        const grades = gradeElements[index];
        const remarks = remarksElements[index];
        
        totalElement.value = caValue + examValue;

        const totalMarks = totalElement.value;
        
        if(totalMarks <= 39){
            grades.value = 'F'
            remarks.value = 'Fail'
        }else if(totalMarks <= 49){
            grades.value = 'D'
            remarks.value = 'Fair'
        }else if(totalMarks <= 59){
            grades.value = 'C'
            remarks.value = 'Credit'
        }else if(totalMarks <= 69){
            grades.value = 'B'
            remarks.value = 'Very Good'
        }else if(totalMarks >= 70 && totalMarks <= 100 ){
            grades.value = 'A'
            remarks.value = 'Excellent'
        }
           
    });

}

document.addEventListener('submit', hideDetails);