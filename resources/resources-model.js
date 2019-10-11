const db = require("../data/dbConfig");

module.exports = {
    insert,
    getAll
}

function insert(resource) {
    return db("resources").insert(resource);
}

function getAll() {
    return db("resources");
}