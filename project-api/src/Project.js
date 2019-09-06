import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ProjectDiv, ProjectDetail} from './styled-projects.js';

function Project() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5003/projects')
            .then(res => {
                console.log(res.data);
                setProjectList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return(
        <ProjectDiv>
                {projectList.map(project => {
                    return (<ProjectDetail key={project.id}>
                        <h4>Project: {project.name}</h4>
                        <h5>Description: {project.description}</h5>
                    </ProjectDetail>)
                })}
        </ProjectDiv>
  );
}

export default Project;