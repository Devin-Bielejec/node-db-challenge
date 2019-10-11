const router = require("express").Router();
const Projects = require("./projects-model");

router.post("/projects", (req, res) => {
    const project = req.body;

    Projects.insert(project)
    .then(response => {
        console.log("PROJECT POST", response);
        res.status(201).json({message: "Project Created!"})
    })
    .catch(err => {
        res.status(500).json({message: "Server Error", error: err})
    })
})

router.get("/projects", (req, res) => {
    Projects.getAll()
    .then(projects => {
        console.log("PROJECT GET", projects);
        res.status(201).json({message: "Projects got!", data: projects})
    })
    .catch(err => {
        res.status(500).json({message: "Server Error", error: err})
    })
})
module.export = router;