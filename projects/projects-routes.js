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

router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not get project"});
        })
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Server error, could not get project actions"});
        })
});

router.post('/', validateProject, (req, res) => {
    const newProject = req.body;
    Projects.insert(newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not create new project"});
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
        .then(id => {
            res.status(200).json({message: "Successfully deleted this project"});
        })
        .catch(() => {
            res.status(500).json({errorMessage:"Could not delete this project"})
        })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    const id = req.params.id;
    const update = req.body;
    Projects.update(id, update)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not edit this project"});
        })
});

//Custom Middleware
function validateProjectId (req, res, next) {
    const id = req.params.id
    Projects.get(id)
    .then(result => {
        if(result) {
            next();
        } else {
            res.status(400).json({message: "This project does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

function validateProject(req, res, next) {
    const project = req.body;
    console.log(project)
    if(!project.name) {
        res.status(400).json({message: "Required: Provide a name"})
    } else if(!project.description) {
        res.status(400).json({message: "Requied: Provide a description"})
    } else if(!project){
        res.status(400).json({message: "Provide project data"})
    } else {
        next();
    }
}

module.exports = router;