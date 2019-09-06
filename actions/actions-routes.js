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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if(action) {
                res.status(200).json(action);
            } else {
                res.status(400).json({errorMessage: "This project does not exist!"})
            }
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not get this action"});
        })
});

router.post('/', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(id => {
            res.status(200).json({message: "Successfully deleted this action"});
        })
        .catch(() => {
            res.status(500).json({errorMessage:"Could not delete this action"})
        })
});

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const update = req.body;
//     Actions.update(id)

// });

module.exports = router;