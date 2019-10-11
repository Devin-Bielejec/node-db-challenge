const router = require("express").Router();
const Tasks = require("./tasks-model.js");

router.post("/", (req, res) => {
    const task = req.body;

    Tasks.insert(task)
    .then(response => {
        console.log("TASK POST", response);
        res.status(201).json({message: "Task Created!"})
    })
    .catch(err => {
        res.status(500).json({message: "Server Error", error: err})
    })
})

router.get("/", (req, res) => {
    Tasks.getAll()
    .then(tasks => {
        console.log("TASK GET", tasks);

        //changing "task_completed" to boolean
        newTasks = tasks.map( task => {
            if (task.task_completed === 0) {
                return {...task, task_completed: false}
            } else {
                return {...task, task_completed: true}
            }
        })

        res.status(201).json({message: "Tasks got!", data: newTasks})
    })
    .catch(err => {
        res.status(500).json({message: "Server Error", error: err})
    })
})

module.exports = router;