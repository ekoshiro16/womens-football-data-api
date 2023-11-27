const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// const { client } = require("./db/client");

const app = express();

app.use((req, res, next) => {
    console.log("We have received a request.")
    next(); 
});

app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// client.connect(); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Currently running on port ${PORT}`)
});