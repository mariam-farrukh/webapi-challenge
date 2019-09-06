const express = require("express");
const Actions = require("../data/helpers/actionModel.js");
const Projects = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not get actions"});
        })
});

router.get('/:actionid', validateActionId, (req, res) => {
    const actionid = req.params.actionid
    Actions.get(actionid)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not get actions"});
        })
});

router.post('/', validateActionProjectId, validateAction, (req, res) => {
    const newAction = req.body;
    Actions.insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not create new action"});
        })
});

router.delete('/:actionid', validateActionId, (req, res) => {
    const actionid = req.params.actionid;
    Actions.remove(actionid)
        .then(action => {
            res.status(200).json({message: "Successfully deleted this action"});
        })
        .catch(() => {
            res.status(500).json({errorMessage:"Could not delete this action"})
        })
});

router.put('/:actionid', validateActionId, validateAction, validateActionProjectId, (req, res) => {
    const actionid = req.params.actionid;
    const update = req.body;
    Actions.update(actionid, update)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not update action"});
        })

});

//Custom Middleware for Actions

function validateActionId (req, res, next) {
    const actionid = req.params.actionid
    Actions.get(actionid)
    .then(result => {
        if(result) {
            next();
        } else {
            res.status(404).json({errorMessage: "This action does not exist"})
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: "This is not working, check for valid id"})
    })
}

function validateAction (req, res, next) {
    const action = req.body;
    if(!action.project_id) {
        res.status(400).json({errorMessage: 'Provide a valid project_id for the action'})
    } else if(!action.notes) {
        res.status(400).json({errorMessage: 'Provide a required note in the action'})
    } else if(!action.description){
        res.status(400).json({errorMessage: 'Provide a required description in the action'})
    } else {
        next();
    }
}

function validateActionProjectId (req, res, next) {
    const projectid = req.body.project_id;
    Projects.get(projectid)
    .then(project => {
        if(project) {
            next()
        } else {
            res.status(404).json({errorMessage: "This project could not be found"})
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: "This is not working, check for valid id"})
    })
}

module.exports = router;