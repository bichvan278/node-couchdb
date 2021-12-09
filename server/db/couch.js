// const NodeCouchDb = require('node-couchdb');
// const express = require('express')

// const couch = new NodeCouchDb({
//     auth: {
//         user: 'admin',
//         pass: '12345'
//     }
// });

// couch.listDatabases().then(function(dbs){
//     console.log(dbs);
// });

const couch = require('nano')(
    { url : "http://admin:admin@localhost:5984"});
const db = couch.use('library');

module.exports = couch;