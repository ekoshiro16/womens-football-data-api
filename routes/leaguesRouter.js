require("dotenv").config(); 
const express = require("express");
const leaguesRouter = express.Router(); 

leaguesRouter.get("/teams-by-season", async (req, res) => {
    try {
        const { leagueId, season } = req.query; 

        const url = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${parseInt(leagueId)}&season=${parseInt(season)}`;

        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        })

        const data = await response.json(); 

        console.log(data)

        if (data && data?.response) {
            res.send(data.response);
        };
    } catch (e) {
        console.error(e)
    }
});

module.exports = leaguesRouter; 