import {store} from '../store/store.js';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function requestLogin(userCredentials){
    return function(dispatch){
        const data = new FormData();
        data.append('username', userCredentials.username);
        data.append('password', userCredentials.password);

        return fetch('http://www.josephpboyle.com/api/swingessentials.php/login', {
            method: 'POST',
            body: data
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(loginSuccess(json)));
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
