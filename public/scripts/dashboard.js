import getSchoolData from "./modal.js";

(async () => {
    const data = await getSchoolData();
    // Now you can use the data
    console.log(data);
})();