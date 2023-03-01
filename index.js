//initialization of libraries
require('dotenv').config();
const express = require('express');
const request = require('request');
const helmet = require('helmet');
const MongoClient = require('mongodb').MongoClient;

//documentation
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

//initialization of app
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(helmet());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//documentation
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//routes
app.use('/landing', require('./routes/landing_route'));
app.use('/journals', require('./routes/journals_route'));
app.use('/specialIssues', require('./routes/special_issues_route'));


app.get('*', (req, res) => {
    const url = 'https://http.cat/404';

    request({
        url: url,
        encoding: null
    }, 
    (err, resp, buffer) => {
        if (!err && resp.statusCode === 200){
            res.set("Content-Type", "image/jpeg");
            res.send(resp.body);
        }
    });
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