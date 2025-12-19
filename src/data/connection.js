const {MongoClient} = require('mongodb');

const URI = 'mongodb://localhost:27017';
const client = new MongoClient(URI);

let database;

async function connectDB() {
    try{
        await client.connect();
        database = client.db('bountyhub');
        console.log("Connected with database");
    }catch(error){
        console.log("Database connection error", error);
    }
}

function getDB(){
    if(!database) throw new Error("Database does not exists");
    return database;
}

module.exports = {connectDB, getDB};