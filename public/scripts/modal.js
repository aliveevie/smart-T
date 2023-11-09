// Get references to the modal and registration button
const modal = document.getElementById("modal-window");
const registrationButton = document.getElementById("registration-button");
const verificationForm = document.getElementById("verification-form");

// Function to display the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Event listener to open the modal when the registration button is clicked
registrationButton.addEventListener("click", openModal);

// Event listener to close the modal when the form is submitted
verificationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting (for demonstration)
    closeModal();
    // Here, you can add your logic to process the verification code and continue the registration process.
});
