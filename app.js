const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const NodeCouchDb = require('node-couchdb');

const dbname = 'users';
const dburl = "http://127.0.0.1:5984/"

const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: '12345'
    }
});
couch.listDatabases().then(function(dbs){
    console.log(dbs);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../library-vue-cli')));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

// Login in function
// app.post('/users/', function(req, res){
//     const username = req.body.u_name;
//     const password = req.body.p_word;

//     couch.getUser(dbname,{
//         username: username,
//         password: [password]
//     }).then(function(data, headers, status){
//         res.static(path.join(__dirname, '../library-vue-cli'));
//     }, function(err){
//         res.send(err);
//     })
// });


// HTTP server
http.createServer(app).listen(8080, function(){
    console.log('Connection is successful')
});