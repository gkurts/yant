var massive = require('massive');
var dbConnection = "postgres://user:pass@localhost:5432/tasks";
var db = massive.connectSync({connectionString : dbConnection});

module.exports = db;