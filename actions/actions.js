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
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';
export const SET_SWING_FLAG_SUCCESS = 'SET_SWING_FLAG_SUCCESS';
//ADD FAILURE case
export const SET_FO_URI_SUCCESS = 'SET_FO_URI_SUCCESS';
//ADD FAILURE case
export const SET_DTL_URI_SUCCESS = 'SET_DTL_URI_SUCCESS';
//ADD FAILURE case
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const PACKAGE_LOGOUT_SUCCESS = 'PACKAGE_LOGOUT_SUCCESS';
export const LESSON_LOGOUT_SUCCESS = 'LESSON_LOGOUT_SUCCESS';
export const CREDIT_LOGOUT_SUCCESS = 'CREDIT_LOGOUT_SUCCESS';
export const SETTING_LOGOUT_SUCCESS = 'SETTING_LOGOUT_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
//ADD FAILURE CASE
export const ORDER_SUBMITTED_SUCCESS = 'ORDER_SUBMITTED_SUCCESS';
//ADD FAILURE CASE
export const ACTIVATE_UNLIMITED_SUCCESS = 'ACTIVATE_UNLIMITED_SUCCESS';
export const ACTIVATE_UNLIMITED_FAILURE = 'ACTIVATE_UNLIMITED_FAILURE';
export const SET_FROM = 'SET_FROM';

export const BASEURL = 'https://www.swingessentials.com/apis/swingessentials.php/'

// sandbox 'https://www.josephpboyle.com/api/swingessentials2.php/'
// prod 'https://www.swingessentials.com/apis/swingessentials.php/'


//login function.  also requests settings, lessons, packages and credits
export function requestLogin(userCredentials){
    return function(dispatch){
        const data = new FormData();
        data.append('username', userCredentials.username);
        data.append('password', userCredentials.password);

        return fetch(BASEURL + 'login', {
            method: 'GET',
            headers: {'Authorization': 'basic ' + btoa(userCredentials.username) + '.' + btoa(userCredentials.password)}
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    console.log('response status', response.status)
                    console.log('response', response)
                    response.json()
                    .then((json) => dispatch(loginSuccess({...json,token: response.headers.get('Token')})));
                    dispatch(requestCredits(response.headers.get('Token')));
                    // dispatch(requestSettings(response.headers.get('Token')))
                    dispatch(requestLessons(response.headers.get('Token')));
                    dispatch(requestPackages());
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
  // console.log(response)
    return{
        type: LOGIN_ERROR,
        response: response.status
    }
}

//requests user settings
export function requestSettings(token){
    return function(dispatch){
        return fetch(BASEURL + 'settings', {
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

//updates user settings
export function userSettingsUpdate(userSettings){
  return function(dispatch){
    return fetch(BASEURL + 'settings', {
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

//requests available user lessons
export function requestLessons(token){
    return function(dispatch){
        return fetch(BASEURL + 'lessons', {
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
  // console.log(response)
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

//sets a request id, which is used to pull up specific user lessons
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

//requests available packages for purchase
export function requestPackages(){
    return function(dispatch){
        return fetch(BASEURL + 'packages', {
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
  console.log(response)
    return{
        type: GET_PACKAGES_SUCCESS,
        data: response
    }
}

function getPackagesFailure(response){
  console.log('get packages failure')
  // console.log(response)
  return{
      type: GET_PACKAGES_FAILURE,
      response: response.status
  }
}

//used when a user selects a lesson to order
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

//obtains availalbe discount codes
export function requestDiscount(discountCode){
    return function(dispatch){
        const data = new FormData();
        data.append('discount', discountCode.discount);

        return fetch(BASEURL + 'checkCoupon?code=' + discountCode.discount, {
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

export function setSwingFlagSuccess(response){
  console.log('set swing flag success')
  console.log(response)
    return{
        type: SET_SWING_FLAG_SUCCESS,
        data: response
    }
}

export function setFoUriSuccess(response){
  console.log('set fo uri success')
  console.log(response)
    return{
        type: SET_FO_URI_SUCCESS,
        data: response
    }
}

export function setDtlUriSuccess(response){
  console.log('set dtl uri success')
  console.log(response)
    return{
        type: SET_DTL_URI_SUCCESS,
        data: response
    }
}

//updates price details after coupon is used
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

//updates the viewed status of availalbe lessons
export function updateViewedStatus(viewedStatus){
  return function(dispatch){
    return fetch(BASEURL + 'viewed', {
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
    console.log(response)
    return{
        type: UPDATE_VIEWED_STATUS_FAILURE,
        response: response.status
    }
}

//submits an order...UPDATE TO HANDLE BRAINTREE TRANSACTIONS
export function submitOrder(data){
  return function(dispatch){
    return fetch(BASEURL + (data.platform === 'ios' ? 'executeiospayment' : 'executeandroidpayment'), {
        method: 'PUT',
        body: JSON.stringify({package: data.package, receipt: data.receipt}),
        headers: {
          'Authorization': 'bearer ' + data.token,
        }
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                dispatch(submitOrderSuccess(response));
                dispatch(requestCredits(data.token));
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
    console.log(response)
    return{
        type: SUBMIT_ORDER_FAILURE,
        response: response.status
    }
}

//obtains the available credits for a user
export function requestCredits(token){
    return function(dispatch){
        return fetch(BASEURL + 'credits', {
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
  // console.log('request credits success success')
  // console.log(response)
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

export function futch(url, opts={}, onProgress) {
    return new Promise( (res, rej)=>{
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers||{})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(xhr);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress;
        xhr.send(opts.body);
    });
}

//redeems lesson credits
export function redeemLessons(token, updateProgress){
    return function(dispatch){
      const data = new FormData();
      data.append('notes', '');
      data.append('fo', {
        name: 'fo.mov',
        uri: token.fo,
        type: 'video/mov'});
      data.append('dtl', {
        name: 'dtl.mov',
        uri: token.dtl,
        type: 'video/mov'});

        console.log('data')
        console.log(data)

        return futch(BASEURL + 'redeem', {
          method: 'POST',
          headers: {'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token.bearerToken},
          body: data
        }, updateProgress)
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(setModalVisible(false));
                    dispatch(orderSubmittedSuccess(true));
                    dispatch(redeemLessonsSuccess());
                    dispatch(requestCredits(token.bearerToken));
                    dispatch(requestLessons(token.bearerToken));
                    break;
                default:
                    dispatch(setModalVisible(false));
                    dispatch(redeemLessonsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function redeemLessonsSuccess(response){
  console.log('redeem lessons success')
  console.log(response)
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


export function setModalVisible(response){
  console.log('set modal visible response')
  console.log(response)
    return{
        type: SET_MODAL_VISIBLE,
        data: response
    }
}

export function orderSubmittedSuccess(response){
  console.log('order submitted success response')
  console.log(response)
    return{
        type: ORDER_SUBMITTED_SUCCESS,
        data: response
    }
}

//sends a request to trigger an email to be sent to the user to reset their password
export function resetPassword(userEmail){
  return function(dispatch){
    return fetch(BASEURL + 'reset', {
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

export function createAccount(accountData){
  return function(dispatch){
    return fetch(BASEURL + 'user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          'username': accountData.username,
          'firstName': accountData.firstName,
          'lastName': accountData.lastName,
          'email': accountData.email,
          'password': accountData.password,
          'phone': accountData.phone
        })
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                dispatch(createAccountSuccess(response))
                break;
            default:
                dispatch(createAccountFailure(response))
                break;
        }
    })
    .catch((error) => console.error(error));
  }
}

function createAccountSuccess(response){
    console.log('create account success')
    console.log(response)
    return{
        type: CREATE_ACCOUNT_SUCCESS,
        data: response
    }
}

function createAccountFailure(response){
    console.log('create account failure')
    console.log(response)
    return{
        type: CREATE_ACCOUNT_FAILURE,
        response: response.status
    }
}

export function logout(token){
    console.log('logout function')
    return function(dispatch){
        return fetch(BASEURL + 'logout', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token.bearerToken}
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(logoutSuccess(response));
                    dispatch(packageLogoutSuccess(response));
                    dispatch(lessonLogoutSuccess(response));
                    dispatch(creditLogoutSuccess(response));
                    dispatch(settingLogoutSuccess(response));
                    dispatch(userLogoutSuccess(response));
                    break;
                default:
                    dispatch(logoutFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function logoutSuccess(response){
  console.log('logout success')
  console.log(response)
    return{
        type: LOGOUT_SUCCESS,
        data: response
    }
}

function packageLogoutSuccess(response){
  console.log('package logout success')
  console.log(response)
    return{
        type: PACKAGE_LOGOUT_SUCCESS,
        data: response
    }
}

function lessonLogoutSuccess(response){
  console.log('lesson logout success')
  console.log(response)
    return{
        type: LESSON_LOGOUT_SUCCESS,
        data: response
    }
}

function creditLogoutSuccess(response){
  console.log('credit logout success')
  console.log(response)
    return{
        type: CREDIT_LOGOUT_SUCCESS,
        data: response
    }
}

function settingLogoutSuccess(response){
  console.log('setting logout success')
  console.log(response)
    return{
        type: SETTING_LOGOUT_SUCCESS,
        data: response
    }
}

function userLogoutSuccess(response){
  console.log('user logout success')
  console.log(response)
    return{
        type: USER_LOGOUT_SUCCESS,
        data: response
    }
}

function logoutFailure(response){
  console.log('logout failure')
    return{
        type: LOGOUT_FAILURE,
        response: response.status
    }
}

export function activateUnlimited(token){
  return function(dispatch){
    return fetch(BASEURL + 'unlimited', {
        method: 'PUT',
        headers: {
          'Authorization': 'bearer ' + token,
        }
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                dispatch(activateUnlimitedSuccess(response));
                dispatch(requestCredits(token));
                break;
            default:
                dispatch(activateUnlimitedFailure(response));
                break;
        }
    })
    .catch((error) => console.error(error));
  }
}

function activateUnlimitedSuccess(response){
    console.log('activate unlimited success')
    console.log(response)
    return{
        type: ACTIVATE_UNLIMITED_SUCCESS,
        data: response
    }
}

function activateUnlimitedFailure(response){
    console.log('activate unlimited failure')
    console.log(response)
    return{
        type: ACTIVATE_UNLIMITED_FAILURE,
        response: response.status
    }
}

export function setFrom(response){
    console.log('set from action')
    console.log(response)
    return{
        type: SET_FROM,
        data: response
    }
}
