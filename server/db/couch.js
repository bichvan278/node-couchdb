const NodeCouchDb = require('node-couchdb');
const express = require('express')

const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: '12345'
    }
});

couch.listDatabases().then(function(dbs){
    console.log(dbs);
});

module.exports = couch;