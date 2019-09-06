const express = require('express');
const cors = require('cors');

const projectsRoutes = require("./projects/projects-routes.js");
const actionsRoutes = require("./actions/actions-routes.js");
const server = express();

server.use(express.json());
server.use(cors());
server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin")
    next()
});

server.use("/projects", projectsRoutes);
server.use("/actions", actionsRoutes);

const port = 5003;

server.listen(port, () => console.log(`\n API on port: ${port} \n`))