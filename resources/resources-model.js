const db = require("../data/dbConfig");

module.exports = {
    insert,
    getAll
}

function insert(project) {
    return db("projects").insert(project);
}

function getAll() {
    return db("projects");
}