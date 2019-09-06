const express = require("express");
const Projects = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "Could not get projects"});
        })
});

module.exports = router;