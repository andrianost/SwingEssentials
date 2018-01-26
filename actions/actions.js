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
// ADD FAILURE CASE
export const GET_PACKAGES_SUCCESS = 'GET_PACKAGES_SUCCESS';
export const GET_PACKAGES_FAILURE = 'GET_PACKAGES_FAILURE';
export const ORDER_LESSONS_SUCCESS = 'ORDER_LESSONS_SUCCESS';
// ADD FAILURE CASE
export const DISCOUNT_SUCCESS = 'DISCOUNT_SUCCESS';
export const DISCOUNT_FAILURE = 'DISCOUNT_FAILURE';
export const UPDATE_VIEWED_STATUS_SUCCESS = 'UPDATE_VIEWED_STATUS_SUCCESS';
export const UPDATE_VIEWED_STATUS_FAILURE = 'UPDATE_VIEWED_STATUS_FAILURE';
export const UPDATE_PRICE_SUCCESS = 'UPDATE_PRICE_SUCCESS';
//ADD FAILURE case
export const SUBMIT_ORDER_SUCCESS = 'SUBMIT_ORDER_SUCCESS';
export const SUBMIT_ORDER_FAILURE = 'SUBMIT_ORDER_FAILURE';
export const REQUEST_CREDITS_SUCCESS = 'REQUEST_CREDITS_SUCCESS';
export const REQUEST_CREDITS_FAILURE = 'REQUEST_CREDITS_FAILURE';
export const REDEEM_LESSONS_SUCCESS = 'REDEEM_LESSONS_SUCCESS';
export const REDEEM_LESSONS_FAILURE = 'REDEEM_LESSONS_FAILURE';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

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
                    .then(() => dispatch(requestPackages()))
                    .then(() => dispatch(requestCredits(response.headers.get('Token'))));
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
  console.log('login success')
    return{
        type: LOGIN_SUCCESS,
        data: response
    }
}

function loginFailure(response){
  console.log('login failure')
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
  console.log('get settings success')
    return{
        type: GET_SETTINGS_SUCCESS,
        data: response
    }
}

function getSettingsFailure(response){
  console.log('get settings failure')
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
                dispatch(putSettingsFailure(response))
                dispatch(requestSettings(userSettings.bearerToken));
                break;
        }
    })
    .catch((error) => console.error(error));
  }
}

function putSettingsSuccess(response){
    console.log('put settings success')
    return{
        type: PUT_SETTINGS_SUCCESS,
        data: response
    }
}

function putSettingsFailure(response){
    console.log('put settings failure')
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
  console.log('get packages success')
  // console.log(response)
    return{
        type: GET_PACKAGES_SUCCESS,
        data: response
    }
}

function getPackagesFailure(response){
  console.log('get packages failure')
  console.log(response)
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

export function requestDiscount(discountCode){
    return function(dispatch){
        const data = new FormData();
        data.append('discount', discountCode.discount);

        return fetch('http://www.josephpboyle.com/api/swingessentials.php/coupon/' + discountCode.discount, {
            method: 'GET',
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(discountSuccess(json)));
                    break;
                default:
                    dispatch(discountFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function discountSuccess(response){
  console.log('discount success')
    return{
        type: DISCOUNT_SUCCESS,
        data: response
    }
}

function discountFailure(response){
  console.log('discount failure')
    return{
        type: DISCOUNT_FAILURE,
        response: response.status
    }
}

export function updatePrice(response){
    return function(dispatch){
      dispatch(updatePriceSuccess(response));
    }
}

function updatePriceSuccess(response){
  console.log('update prices success')
    return{
        type: UPDATE_PRICE_SUCCESS,
        data: response
    }
}

export function updateViewedStatus(viewedStatus){
  return function(dispatch){
    return fetch('http://www.josephpboyle.com/api/myapi.php/viewed', {
        method: 'PUT',
        headers: {
          'Authorization': 'bearer ' + viewedStatus.bearerToken,
        },
        body: JSON.stringify( {
          'id': parseInt(viewedStatus.request_id),
        })
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                dispatch(updateViewedStatusSuccess(response));
                dispatch(requestLessons(viewedStatus.bearerToken));
                break;
            default:
                dispatch(updateViewedStatusFailure(response))
                break;
        }
    })
    .catch((error) => console.error(error));
  }
}

function updateViewedStatusSuccess(response){
    console.log('update viewed status success')
    return{
        type: UPDATE_VIEWED_STATUS_SUCCESS,
        data: response
    }
}

function updateViewedStatusFailure(response){
    console.log('update viewed status failure')
    return{
        type: UPDATE_VIEWED_STATUS_FAILURE,
        response: response.status
    }
}

export function submitOrder(data){
  return function(dispatch){
    return fetch('http://www.josephpboyle.com/api/myapi.php/purchase/' + data.shortcode, {
        method: 'POST',
        headers: {
          'Authorization': 'bearer ' + data.bearerToken,
        }
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                dispatch(submitOrderSuccess(response))
                break;
            default:
                dispatch(submitOrderFailure(response))
                break;
        }
    })
    .catch((error) => console.error(error));
  }
}

function submitOrderSuccess(response){
    console.log('submit order success')
    return{
        type: SUBMIT_ORDER_SUCCESS,
        data: response
    }
}

function submitOrderFailure(response){
    console.log('submit order failure')
    return{
        type: SUBMIT_ORDER_FAILURE,
        response: response.status
    }
}

export function requestCredits(token){
    return function(dispatch){
        return fetch('http://www.josephpboyle.com/api/myapi.php/credits', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(requestCreditsSuccess(json)));
                    break;
                default:
                    dispatch(requestCreditsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function requestCreditsSuccess(response){
  console.log('request credits success success')
  console.log(response)
    return{
        type: REQUEST_CREDITS_SUCCESS,
        data: response
    }
}

function requestCreditsFailure(response){
  console.log('request credits failure')
    return{
        type: REQUEST_CREDITS_FAILURE,
        response: response.status
    }
}

export function redeemLessons(token){
    return function(dispatch){
        return fetch('http://www.josephpboyle.com/api/myapi.php/redeem', {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token.bearerToken}
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(redeemLessonsSuccess(json)));
                    break;
                default:
                    dispatch(redeemLessonsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function redeemLessonsSuccess(response){
  console.log('redeem lessons success')
  // console.log(response)
    return{
        type: REDEEM_LESSONS_SUCCESS,
        data: response
    }
}

function redeemLessonsFailure(response){
  console.log('redeem lessons failure')
  console.log(response)
    return{
        type: REDEEM_LESSONS_FAILURE,
        response: response.status
    }
}

export function resetPassword(userEmail){
  return function(dispatch){
    return fetch('http://www.josephpboyle.com/api/myapi.php/reset', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          'email': userEmail.userEmail,
        })
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                dispatch(resetPasswordSuccess(response))
                break;
            default:
                dispatch(resetPasswordFailure(response))
                break;
        }
    })
    .catch((error) => console.error(error));
  }
}

function resetPasswordSuccess(response){
    console.log('reset password success')
    console.log(response)
    return{
        type: RESET_PASSWORD_SUCCESS,
        data: response
    }
}

function resetPasswordFailure(response){
    console.log('reset password failure')
    console.log(response)
    return{
        type: RESET_PASSWORD_FAILURE,
        response: response.status
    }
}
