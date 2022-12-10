
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

app.get('*', (req, res) => {
    res.json({ error: "404"})
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

async function main() {
    const uri = process.env.MONGO_URI;
    global.client = new MongoClient(uri);

    try {
        await client.connect();
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);