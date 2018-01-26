import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../navigators/AppNavigator.js';

import {LOGIN_SUCCESS, LOGIN_ERROR, GET_SETTINGS_SUCCESS, GET_SETTINGS_FAILURE,
				PUT_SETTINGS_SUCCESS, PUT_SETTINGS_FAILURE, GET_LESSONS_SUCCESS,
				GET_LESSONS_FAILURE, SET_REQUEST_ID_SUCCESS, GET_PACKAGES_SUCCESS,
				GET_PACKAGES_FAILURE, ORDER_LESSONS_SUCCESS, DISCOUNT_SUCCESS,
				DISCOUNT_FAILURE, UPDATE_VIEWED_STATUS_SUCCESS,
				UPDATE_VIEWED_STATUS_FAILURE, UPDATE_PRICE_SUCCESS, SUBMIT_ORDER_SUCCESS,
				SUBMIT_ORDER_FAILURE, REQUEST_CREDITS_SUCCESS, REQUEST_CREDITS_FAILURE,
				REDEEM_LESSONS_SUCCESS, REDEEM_LESSONS_FAILURE, RESET_PASSWORD_SUCCESS,
				RESET_PASSWORD_FAILURE} from '../actions/actions.js';

const userReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
			console.log('user reducer')
			return{...state,
				username: action.data.personal.username,
				firstName: action.data.personal.first_name,
				lastName: action.data.personal.last_name,
				email: action.data.personal.email
			};
		default:
			return state;
	}
}
const settingsReducer = (state=[], action) => {
	switch(action.type){
		case GET_SETTINGS_SUCCESS:
			console.log('settings reducer')
			return{...state,
				avatar: action.data.avatar,
				handedness: action.data.handed,
				camera:{
            delay: action.data.camera.delay,
            duration: action.data.camera.duration,
            overlay: action.data.camera.overlay
        }
			}
		case GET_SETTINGS_FAILURE:
			return state;
		case PUT_SETTINGS_SUCCESS:
			return state;
		case PUT_SETTINGS_FAILURE:
			return state;
		default:
			return state;
	}
}
const creditsReducer = (state=[], action) => {
	switch(action.type){
		case REQUEST_CREDITS_SUCCESS:
			console.log('request credits success reducer')
			return{...state,
				count: action.data.count,
				unlimited_count: action.data.unlimited_count,
				unlimited_date: action.data.unlimited_date,
			}
		case REQUEST_CREDITS_FAILURE:
			console.log('request credits failure reducer')
			return state;
	default:
		return state;
	}
}
const lessonsReducer = (state=[], action) => {
	switch(action.type){
		case GET_LESSONS_SUCCESS:
			console.log('get lessons success reducer')
			return{...state,
				loading: false,
				pending: action.data.pending,
				closed: action.data.closed,
			}
		case GET_LESSONS_FAILURE:
			return state;
		case SET_REQUEST_ID_SUCCESS:
		console.log('set request id reducer')
			return{...state,
				request_id: action.data.request_id,
				request_date: action.data.request_date,
				request_url: action.data.request_url,
				request_notes: action.data.request_notes,
				viewed: action.data.viewed,
				response_notes: action.data.response_notes
			}
		case UPDATE_VIEWED_STATUS_SUCCESS:
		console.log('update viewed status success reducer')
			return{...state,
				viewed: action.data.viewed
			}
		case UPDATE_VIEWED_STATUS_FAILURE:
		console.log('update viewed status failed reducer')
			return state;
		case REDEEM_LESSONS_SUCCESS:
		console.log('redeem lessons success reducer')
			return state;
		case REDEEM_LESSONS_FAILURE:
		console.log('redeem lessons failed reducer')
			return state;
		default:
			return state;
		}
}
const packagesReducer = (state=[], action) => {
	switch(action.type){
		case GET_PACKAGES_SUCCESS:
		console.log('get packages success reducer')
			return{...state,
				packages: action.data,
			}
		case GET_PACKAGES_FAILURE:
			return state;
		case ORDER_LESSONS_SUCCESS:
		console.log('order lessons success reducer')
		// console.log(action)
			return{...state,
				name: action.data.name,
				description: action.data.description,
				price: action.data.price,
				shortcode: action.data.shortcode
			}
		case UPDATE_PRICE_SUCCESS:
		console.log('update price success reducer')
		// console.log(action.data.price)
		// console.log(typeof action.data.price)
			return{...state,
				price: action.data.price
			}
		case DISCOUNT_SUCCESS:
		console.log('discount success reducer')
		// console.log(action)
			return{...state,
				type: action.data.type,
				value: action.data.value,
			}
		case DISCOUNT_FAILURE:
		console.log('discount failure reducer')
		// console.log(action)
			return state;
		case SUBMIT_ORDER_SUCCESS:
		console.log('submit order success reducer')
		// console.log(action.data)
			return{...state,
				response: action.data
			}
		case SUBMIT_ORDER_FAILURE:
		console.log('submit order failure reducer')
		// console.log(action)
			return state;
		default:
			return state;
		}
}
const loginReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
			return{...state,
				token: action.data.token,
				failCount: 0
			}
		case LOGIN_ERROR:
			return{...state,
				token: null,
				failCount: state.failCount + 1
			}
		case RESET_PASSWORD_SUCCESS:
		console.log('reset password success reducer')
		// console.log(action)
			return{...state,
				response: action.data
			}
		case RESET_PASSWORD_FAILURE:
		console.log('reset password failure reducer')
		// console.log(action)
			return state;
		default:
			return state;
	}
}

// reducer for the navigator actions
const navigationReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
}

const initialAuthState = {isLoggedIn: false};

const AppReducer = combineReducers({
    userData: userReducer,
    settings: settingsReducer,
    credits: creditsReducer,
    lessons: lessonsReducer,
    packages: packagesReducer,
    login: loginReducer,
    nav: navigationReducer,
});

export default AppReducer;
