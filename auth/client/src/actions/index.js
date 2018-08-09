import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from "./types";



export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signup', formProps);

        dispatch({type: AUTH_USER, payload: response.data.token});

        localStorage.setItem('token', response.data.token)
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use'})
    }
};

// redux-thunk gör att vi kan returnera en funktion istället för action-objekt
// funktion med dispatch som parameter skickar vidare action (dispatchar) varje gång.
// Man kan skapa så många requests man vill, till skillnad från tex redux promise)

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps);

        dispatch({type: AUTH_USER, payload: response.data.token});

        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials'})
    }
};