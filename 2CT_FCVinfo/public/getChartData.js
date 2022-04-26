
async function sampleResolve() {
    try {
        const response = await fetch(process.env.API_POINT, {
            method: "GET",
            mode: 'cors'
        });
        if (response.ok) {
            const resJson = await response.json();
            // return JSON.stringify(resJson);
            return resJson
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error(error);
    }
};

require('dotenv').config();
console.log(process.env.API_POINT)
sampleResolve()