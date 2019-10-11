const db = require("../data/dbConfig");

module.exports = {
    insert,
    getAll
}

function insert(task) {
    return db("tasks").insert(task);
}

function getAll() {
    return db("tasks as t").innerJoin("projects as p", "p.id", "t.project_id").select("t.task_notes","t.task_completed","p.project_name","p.project_description");
}