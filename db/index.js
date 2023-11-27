const seedDatabase = require("./seed");
const { client } = require("./client")

async function mainFunc() {
    try {
        client.connect(); 
        console.log("Starting to seed db")
        await seedDatabase(); 
    } catch (e) {
        console.error(e); 
    };
};

mainFunc()
    .then(() => {
        console.log("Finished seeding db")
        client.end(); 
    })
    .catch(e => {
        console.error(e)
    })