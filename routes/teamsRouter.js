require("dotenv").config(); 
const express = require("express");
const teamsRouter = express.Router(); 

teamsRouter.get("/general", async (req, res) => {
    try {
        const { teamId } = req.query; 

        const url = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}`;

        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        })

        const data = await response.json(); 

        if (data && data?.response) {
            res.send(data.response);
        };
    } catch (e) {
        console.error(e)
    }
})

module.exports = teamsRouter; 