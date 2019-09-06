import axios from "axios";

export const GET_PROJECTS = "GET_PROJECTS";
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS";
export const GET_PROJECT_FAIL = "GET_PROJECT_FAIL";

export const getProject = () => dispatch => {
    dispatch({ type: GET_PROJECTS });
    axios
    .get("http://localhost:5003/projects/")
    .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_PROJECT_SUCCESS,
          payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
        dispatch({
          type: GET_PROJECT_FAIL,
          payload: err.response
        });
    });
};