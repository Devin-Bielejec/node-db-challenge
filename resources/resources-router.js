const router = require("express").Router();
const Resources = require("./resources-model.js");

router.post("/", (req, res) => {
    const resource = req.body;

    Resources.insert(resource)
    .then(response => {
        console.log("RESOURCE POST", response);
        res.status(201).json({message: "RESOURCE Created!"})
    })
    .catch(err => {
        res.status(500).json({message: "Server Error", error: err})
    })
})

router.get("/", (req, res) => {
    Resources.getAll()
    .then(resources => {
        console.log("PROJECT GET", resources);

        res.status(201).json({message: "Resources got!", data: resources})
    })
    .catch(err => {
        res.status(500).json({message: "Server Error", error: err})
    })
})
module.exports = router;