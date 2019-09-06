const express = require("express");
const Projects = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not get projects"});
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(400).json({errorMessage: "This project does not exist!"})
            }
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not get projects"});
        })
});

router.post('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

router.put('/', (req, res) => {
    
});

module.exports = router;