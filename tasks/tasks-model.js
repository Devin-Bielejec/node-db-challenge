const db = require("../data/dbConfig");

module.exports = {
    insert,
    getAll
}

function insert(task) {
    return db("tasks").insert(task);
}

function getAll() {
    return db("projects").join("tasks", "id", "=", "project_id");
}