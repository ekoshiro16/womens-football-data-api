require("dotenv").config(); 
const express = require("express"); 
const playersRouter = express.Router(); 

const metadata = {
    headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
    }
};

playersRouter.get("/", async (req, res) => {
    try {
        const { playerId, season } = req.query; 

        const url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${playerId}&season=${season}`;

        const response = await fetch(url, metadata);

        const data = await response.json(); 

        if (data && data?.response) {
            res.send(data.response);
        };
    } catch (e) {
        console.error(e); 
    }
});

module.exports = playersRouter; 