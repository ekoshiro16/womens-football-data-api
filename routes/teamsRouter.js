require("dotenv").config(); 
const express = require("express");
const teamsRouter = express.Router(); 

const metadata = {
    headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
    }
}

teamsRouter.get("/general", async (req, res) => {
    try {
        const { teamId } = req.query; 

        const url = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}`;

        const response = await fetch(url, metadata)

        const data = await response.json(); 

        if (data && data?.response) {
            res.send(data.response);
        };
    } catch (e) {
        console.error(e)
    }
});

teamsRouter.get("/statistics", async (req, res) => {
    try {
        const { leagueId, season, teamId } = req.query; 

        const url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`;

        const response = await fetch(url, metadata);

        const data = await response.json(); 

        if (data && data?.response) {
            res.send(data.response); 
        };
    } catch (e) {
        console.error(e); 
    }
});

teamsRouter.get("/squad", async (req, res) => {
    try {
        const { teamId } = req.query; 

        const url = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${teamId}`;

        const response = await fetch(url, metadata);

        const data = await response.json(); 

        if (data && data?.response) {
            res.send(data.response); 
        };
    } catch (e) {
        console.error(e); 
    }
});

teamsRouter.get("/fixtures", async (req, res) => {
    try {
        const { leagueId, season, teamId } = req.query; 

        const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=${season}&team=${teamId}`;

        const response = await fetch(url, metadata);

        const data = await response.json(); 

        if (data && data?.response) {
            res.send(data.response);
        };
    } catch (e) {
        console.error(e); 
    }
});

module.exports = teamsRouter; 