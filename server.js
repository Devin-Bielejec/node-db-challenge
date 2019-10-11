const express = require("express");

const server = express();

const projectsRouter = require("./projects/projects-router.js");
const tasksRouter = require("./tasks/tasks-router.js");

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/tasks", tasksRouter);


module.exports = server;