const pgp = require("pg-promise")();

const db = pgp({
    user: "root",
    password: "",
    host: "localhost",
    port: 5432,
    database: "node-test"
});

module.exports = db;