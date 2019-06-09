const { DB_URI } = require("./config");

/** PostgreSQL Database connection for app */
const { Client } = require("pg");

const client = new Client(DB_URI);

client.connect();

module.exports = client;
