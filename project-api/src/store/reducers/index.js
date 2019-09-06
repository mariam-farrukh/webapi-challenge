import {
    GET_PROJECT_FAIL,
    GET_PROJECT_SUCCESS,
    GET_PROJECTS,
  } from "../actions";
  
  const initialState = {
    projects: [],
    error: "",
    isFetching: false
  };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROJECTS:
        return {
          ...state,
          isFetching: true,
          error: ""
        };
      case GET_PROJECT_FAIL:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case GET_PROJECT_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: "",
          projects: action.payload
        };
    }
}