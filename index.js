const express = require('express');

// const projectsRoutes = require("./projects/projects-routes.js");
const actionsRoutes = require("./actions/actions-routes.js");
const server = express();

server.use(express.json());
// server.use("/api/projects", projectsRoutes);
server.use("/api/actions", actionsRoutes);

const port = 5003;

server.listen(port, () => console.log(`\n API on port: ${port} \n`))