// import 'dotenv/config'
// import express from 'express'

async function sampleResolve() {
    try {
        const response = await fetch('https://vccdg94894.execute-api', {
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

// require('dotenv').config();
// require('dotenv').config();
// console.log(process.env.API_POINT)
sampleResolve()