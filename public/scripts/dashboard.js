// Import the getSchoolData function
import getSchoolData from "./modal.js";

// Example: Using .then() for handling promises
getSchoolData()
  .then(data => {
    console.log(data);
    // Now you can use the data here
  })
  .catch(error => {
    console.error('Error fetching school data:', error);
  });
