const { client } = require("./client")

async function dropTables() {
    try {
        await client.query(`
            DROP TABLE IF EXISTS leagues; 
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
                "leagueId" INT REFERENCES leagues(id),
                "seasonId" INT REFERENCES seasons(id)
            );
        `)
        console.log("Finished creating tables")
    } catch (e) {
        console.error(e); 
    }
}

async function seedDatabase() {
    try {
        await dropTables();
        await createTables(); 
    } catch (e) {
        console.error(e);
    };
};

module.exports = seedDatabase;