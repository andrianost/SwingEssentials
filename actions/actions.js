import {store} from '../store/store.js';
import {btoa} from '../utils/base64.js';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';
export const PUT_SETTINGS_SUCCESS = 'PUT_SETTINGS_SUCCESS';
export const PUT_SETTINGS_FAILURE = 'PUT_SETTINGS_FAILURE';
export const GET_LESSONS_SUCCESS = 'GET_LESSONS_SUCCESS';
export const GET_LESSONS_FAILURE = 'GET_LESSONS_FAILURE';
export const SET_REQUEST_ID_SUCCESS = 'SET_REQUEST_ID_SUCCESS';
export const GET_PACKAGES_SUCCESS = 'GET_PACKAGES_SUCCESS';
export const GET_PACKAGES_FAILURE = 'GET_PACKAGES_FAILURE';
export const ORDER_LESSONS_SUCCESS = 'ORDER_LESSONS_SUCCESS';



export function requestLogin(userCredentials){
    return function(dispatch){
        const data = new FormData();
        data.append('username', userCredentials.username);
        data.append('password', userCredentials.password);

        return fetch('http://www.josephpboyle.com/api/swingessentials.php/login', {
            method: 'GET',
            headers: {'Authorization': 'basic ' + btoa(userCredentials.username) + '.' + btoa(userCredentials.password)}
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(loginSuccess({...json,token: response.headers.get('Token')})))
                    .then(() => dispatch(requestSettings(response.headers.get('Token'))))
                    .then(() => dispatch(requestLessons(response.headers.get('Token'))))
                    .then(() => dispatch(requestPackages()));  
                    break;
                default:
                    dispatch(loginFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function loginSuccess(response){
    return{
        type: LOGIN_SUCCESS,
        data: response
    }
}

function loginFailure(response){
    return{
        type: LOGIN_ERROR,
        response: response.status
    }
}

export function requestSettings(token){
    return function(dispatch){
        return fetch('http://www.josephpboyle.com/api/swingessentials.php/settings', {
            method: 'GET',
            headers: {'Authorization': 'bearer ' + token}
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getSettingsSuccess(json)));
                    break;
                default:
                    dispatch(getSettingsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function getSettingsSuccess(response){
    return{
        type: GET_SETTINGS_SUCCESS,
        data: response
    }
}

function getSettingsFailure(response){
    return{
        type: GET_SETTINGS_FAILURE,
        response: response.status
    }
}

export function userSettingsUpdate(userSettings){
  return function(dispatch){
    return fetch('http://www.josephpboyle.com/api/swingessentials.php/settings', {
        method: 'PUT',
        headers: {
          'Authorization': 'bearer ' + userSettings.bearerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          'handed': userSettings.handedness,
          'camera_delay': userSettings.delay,
          'camera_duration': userSettings.duration,
          'camera_overlay': userSettings.overlay,
          'avatar': 'test'
        })
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                dispatch(putSettingsSuccess(response))
                dispatch(requestSettings(userSettings.bearerToken))
                break;
            default:
                // console.log(response.status);
                // console.log(userSettings.bearerToken)
                dispatch(putSettingsFailure(response))
                dispatch(requestSettings(userSettings.bearerToken));
                break;
        }
    })
    .catch((error) => console.error(error));
  }
}

function putSettingsSuccess(response){
    console.log('put success')
    return{
        type: PUT_SETTINGS_SUCCESS,
        data: response
    }
}

function putSettingsFailure(response){
    console.log('put failure')
    return{
        type: PUT_SETTINGS_FAILURE,
        response: response.status
    }
}

export function requestLessons(token){
    return function(dispatch){
        return fetch('http://www.josephpboyle.com/api/myapi.php/lessons', {
            method: 'GET',
            headers: {'Authorization': 'bearer ' + token}
            // headers: {'Authorization': 'bearer ' + userLessons.bearerToken}
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getLessonsSuccess(json)));
                    break;
                default:
                    dispatch(getLessonsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function getLessonsSuccess(response){
    console.log('get lessons success')
    console.log(response)
    return{
        type: GET_LESSONS_SUCCESS,
        data: response
    }
}

function getLessonsFailure(response){
    console.log('get lessons failure')
    return{
        type: GET_LESSONS_FAILURE,
        response: response.status
    }
}

export function setRequestId(response){
    return function(dispatch){
      dispatch(setRequestIdSuccess(response));
    }
}

function setRequestIdSuccess(response){
  console.log('set request id success')
  return{
    type: SET_REQUEST_ID_SUCCESS,
    data: response
  }
}

export function requestPackages(){
    return function(dispatch){
        return fetch('http://www.josephpboyle.com/api/myapi.php/packages', {
            method: 'GET'
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getPackagesSuccess(json)));
                    break;
                default:
                    dispatch(getPackagesFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function getPackagesSuccess(response){
    // console.log('get packages success')
    // console.log(response)
    return{
        type: GET_PACKAGES_SUCCESS,
        data: response
    }
}

function getPackagesFailure(response){
    console.log('get packages failure')
    return{
        type: GET_PACKAGES_FAILURE,
        response: response.status
    }
}

export function orderLessons(response){
    return function(dispatch){
      dispatch(orderLessonsSuccess(response));
    }
}

function orderLessonsSuccess(response){
  console.log('order lessons success')
  return{
    type: ORDER_LESSONS_SUCCESS,
    data: response
  }
}
