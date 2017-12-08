import {store} from '../store/store.js';
import {btoa} from '../utils/base64.js';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';
export const PUT_SETTINGS_SUCCESS = 'PUT_SETTINGS_SUCCESS';
export const PUT_SETTINGS_FAILURE = 'PUT_SETTINGS_FAILURE';

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
                    //console.log(response.headers.get('Token'));
                    response.json()
                    .then((json) => dispatch(loginSuccess({...json,token: response.headers.get('Token')})))
                    .then(() => dispatch(requestSettings(response.headers.get('Token'))));
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
                    //console.log(response.headers.get('Token'));
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
  console.log(userSettings.handednessSelection)
  console.log(userSettings.bearerToken)
    return fetch('http://www.josephpboyle.com/api/myapi.php/settings', {
        method: 'PUT',
        headers: {
          'Authorization': 'bearer ' + userSettings.bearerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          'handed': userSettings.handednessSelection,
          'camera_delay': 5,
          'camera_duration': 5,
          'camera_overlay': true,
          'avatar': 'test'
        })
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                console.log(response.status)
                dispatch(putSettingsSuccess());
                // dispatch(requestSettings(userSettings.bearerToken))
                break;
            default:
                console.log(response.status)
                dispatch(putSettingsFailure(response));
                // dispatch(requestSettings(userSettings.bearerToken))
                break;
        }
    })
    .catch((error) => console.error(error));
    //console.log(response.status)
  }
}

function putSettingsSuccess(response){
    return{
        type: PUT_SETTINGS_SUCCESS,
        data: response
    }
}

function putSettingsFailure(response){
    return{
        type: PUT_SETTINGS_FAILURE,
        response: response.status
    }
}
