// import 'dotenv/config'
// import express from 'express'

async function sampleResolve() {
    try {
        const response = await fetch(`${process.env.VUE_AWS_CHARTPOINT}`, {
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

sampleResolve()