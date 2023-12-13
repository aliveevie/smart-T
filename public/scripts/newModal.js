
import getSchoolData from "./modal.js";

async function fetchDataAndLog() {
    const data = await getSchoolData();
    console.log(data);
  }
  
fetchDataAndLog();
  