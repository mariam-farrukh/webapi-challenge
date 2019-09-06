import React from 'react';
import { connect } from 'react-redux';
import {getProject} from './store/actions';

function Project(props) {
    return(
        <div>
        <div >
            <button onClick={() => {props.getProject()}}> Fetch the Projects </button>
            {props.projects ? (
                props.projects.map(project => (
                <div className="projects" key={project.name}>
                    <h4>Name: {project.name}</h4>
                    <h4>Description: {project.description}</h4>
                    <h4>Completed: {project.completed}</h4>
                </div>
                ))
            ) : (
                <h1> Projects will be here soon, please wait...</h1>
            )}
        </div>
    </div>
  );
}

const mapStateToProps = state => {
    return{
        projects: state.projects
    };
};

export default connect(
    mapStateToProps,
    {getProject}
) (Project);