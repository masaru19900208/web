// let chartData_Arr
// fetch('https://vccdg94894.execute-api.ap-northeast-1.amazonaws.com/from_DB_to_webChart_STAGE/?getNum=10', {
//     method: "GET",
//     mode: 'cors'
// })
//     .then((response) => {
//         if (response.ok) {
//             return response.json().then(resJson => {
//                 chartData_Arr = JSON.stringify(resJson);
//                 console.log(chartData_Arr);
//             });
//         }
//         throw new Error('Network response was not ok.');
//     })
//     .catch(error => {
//         console.error(error);
//     })
async function sampleResolve() {
    try {
        const response = await fetch('https://vccdg94894.execute-api.ap-northeast-1.amazonaws.com/from_DB_to_webChart_STAGE/?getNum=30', {
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


