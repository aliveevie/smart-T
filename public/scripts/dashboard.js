// dashboard.js

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch data from the API endpoint
  try {
    const response = await fetch('/api/schools/register');
    if (response.ok) {
      const data = await response.json();
      console.log('Data from API:', data);
      // Now you can use the data as needed in your dashboard logic
    } else {
      console.error('Failed to fetch data from API');
    }
  } catch (error) {
    console.error('Error during API fetch:', error);
  }
});
