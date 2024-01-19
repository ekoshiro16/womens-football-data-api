const { client } = require("./client");
const {leagues, teams, seasons} = require("../data_files/leagueData");

async function dropTables() {
    try {
        await client.query(`
            DROP TABLE IF EXISTS teams; 
            DROP TABLE IF EXISTS leagues; 
            DROP TABLE IF EXISTS seasons;
        `)
    } catch (e) {
        console.error(e); 
    };
};

async function createTables() {
    try {
        console.log("Creating tables")
        await client.query(`
            CREATE TABLE leagues(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL
            );

            CREATE TABLE seasons(
                id SERIAL PRIMARY KEY,
                year INT UNIQUE NOT NULL
            );

            CREATE TABLE teams(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL, 
                "leagueId" INT REFERENCES leagues(id),
                "seasonId" INT REFERENCES seasons(id)
            );
        `)
        console.log("Finished creating tables")
    } catch (e) {
        console.error(e); 
    }
}

async function createNewLeague({name}) {
    try {
        console.log("Creating new league: ", name);

        const { rows: [league] } = await client.query(`
            INSERT INTO leagues(name)
            VALUES ($1)
            RETURNING *;
        `, [name]);

        console.log("Just created new league")
        console.log(league);
    } catch (e) {
        console.error(e);
    }
};

async function createNewSeason({year}) {
    try {
        console.log("Creating new season for year: ", year)

        const { rows: [season] } = await client.query(`
            INSERT INTO seasons(year)
            VALUES ($1)
            RETURNING *;
        `, [year]);
        
        console.log("Just created new season")
        console.log(season);
    } catch (e) {
        console.error(e);
    }
};

async function createNewTeam({name, leagueId, seasonId}) {
    try {
        console.log("Beginning to make new team: ", name)

        const { rows: [team] } = await client.query(`
            INSERT INTO teams(name, "leagueId", "seasonId") 
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, leagueId, seasonId]);

        console.log("Finished making team")
        console.log(team);
    } catch (e) {
        console.error(e);
    }
};

async function seedDatabase() {
    try {
        await dropTables();
        await createTables(); 

        // for (let i = 0; i < leagues.length; i++) {
        //     await createNewLeague({name: leagues[i].name});
        // };

        // for (let j = 0; j < seasons.length; j++) {
        //     await createNewSeason({year: seasons[j]})
        // };

        // for (let k = 0; k < teams.length; k++) {
        //     await createNewTeam({
        //         name: teams[k].name,
        //         seasonId: teams[k].seasonId,
        //         leagueId: teams[k].leagueId
        //     })
        // };
    } catch (e) {
        console.error(e);
    };
};

module.exports = seedDatabase;