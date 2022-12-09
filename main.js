//connect to mongodb database
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

async function main() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);