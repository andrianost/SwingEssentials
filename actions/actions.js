import {store} from '../store/store.js';
import {btoa} from '../utils/base64.js';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE= 'GET_SETTINGS_FAILURE';

export function requestLogin(userCredentials){
    return function(dispatch){
        const data = new FormData();
        data.append('username', userCredentials.username);
        data.append('password', userCredentials.password);

        return fetch('http://www.josephpboyle.com/api/myapi.php/login', {
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
        return fetch('http://www.josephpboyle.com/api/myapi.php/settings', {
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
