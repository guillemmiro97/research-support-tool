//initialization of libraries
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const MongoClient = require('mongodb').MongoClient;

//initialization of app
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(helmet());

//routes
app.use('/landing', require('./routes/landing_route'));
app.use('/journals', require('./routes/journals_route'));
app.use('/specialIssues', require('./routes/special_issues_route'));


app.get('*', (req, res) => {
    res.json({ error: "404"})
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

//db client connection
async function run() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("app_recerca").command({ ping: 1 });
        console.log("Connected successfully to server");

        global.db = client.db("app_recerca");
    }
    catch (e) {
        console.error(e);
    }
}

run().catch(console.error);