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
				RESET_PASSWORD_FAILURE, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAILURE,
				SET_SWING_FLAG_SUCCESS, SET_FO_URI_SUCCESS, SET_DTL_URI_SUCCESS, LOGOUT_SUCCESS,
				LOGOUT_FAILURE, SET_MODAL_VISIBLE, ORDER_SUBMITTED_SUCCESS, ACTIVATE_UNLIMITED_SUCCESS,
				ACTIVATE_UNLIMITED_FAILURE, PACKAGE_LOGOUT_SUCCESS, LESSON_LOGOUT_SUCCESS,
				CREDIT_LOGOUT_SUCCESS, SETTING_LOGOUT_SUCCESS, USER_LOGOUT_SUCCESS, SET_FROM} from '../actions/actions.js';

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
		case CREATE_ACCOUNT_SUCCESS:
			console.log('create account success reducer')
			console.log(action.data)
			return{...state,
				response: action.data
			}
		case CREATE_ACCOUNT_FAILURE:
			console.log('create account failure reducer')
			console.log(action.response)
			return{...state,
				response: action.response
			}
		case LOGOUT_SUCCESS:
			console.log('logout success reducer')
			return{...state,
				username: '',
				firstName: '',
				lastName: '',
				email: ''
			}
		case USER_LOGOUT_SUCCESS:
		 console.log('user logout success reducer')
		 // console.log(action)
		 return{...state,
			 username: '',
			 firstName: '',
			 lastName: '',
			 email: '',
			 response: '',
			 }
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
		case SETTING_LOGOUT_SUCCESS:
		 console.log('setting logout success reducer')
		 // console.log(action)
		 return{...state,
			 avatar: '',
			 handedness: '',
			 camera:{
					 delay: 0,
					 duration: 0,
					 overlay: false
			 }
		 }
		default:
			return state;
	}
}
const creditsReducer = (state=[], action) => {
	switch(action.type){
		case REQUEST_CREDITS_SUCCESS:
			console.log('request credits success reducer')
			console.log(action.data)
			return{...state,
				details: action.data,
				count: action.data.count,
				unlimited_count: action.data.unlimited_count,
				unlimited_expires: action.data.unlimited_expires,
			}
		case REQUEST_CREDITS_FAILURE:
			console.log('request credits failure reducer')
			return state;
		case ACTIVATE_UNLIMITED_SUCCESS:
			console.log('activate unlimited success reducer')
			return state;
		case ACTIVATE_UNLIMITED_FAILURE:
			console.log('activate unlimited failure reducer')
			return state;
		case CREDIT_LOGOUT_SUCCESS:
		 console.log('credit logout success reducer')
		 // console.log(action)
		 return{...state,
			 details: [],
			 count: 0,
			 unlimited_count: 0,
			 unlimited_expires: 0,
		 }
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
			// console.log(action.data)
			return{...state,
				request_id: action.data.request_id,
				request_date: action.data.request_date,
				request_url: action.data.request_url,
				request_notes: action.data.request_notes,
				viewed: action.data.viewed,
				response_notes: action.data.response_notes,
				response_video: action.data.response_video
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
		case SET_SWING_FLAG_SUCCESS:
			console.log('set swing flag success reducer')
			// console.log(action.data.fo_flag)
			return{...state,
				fo_flag: action.data.fo_flag,
			}
		case SET_FO_URI_SUCCESS:
			console.log('set fo uri success reducer')
			// console.log(action.data.fo_flag)
			return{...state,
				fo: action.data.fo,
			}
		case SET_DTL_URI_SUCCESS:
			console.log('set dtl uri success reducer')
			// console.log(action.data.fo_flag)
			return{...state,
				dtl: action.data.dtl,
			}
		case SET_MODAL_VISIBLE:
			console.log('set modal visible reducer')
			// console.log(action.data)
			return{...state,
				modalVisible: action.data,
			}
		case ORDER_SUBMITTED_SUCCESS:
			console.log('order submitted success reducer')
			// console.log(action.data)
			return{...state,
				orderSubmitted: action.data,
			}
		case LESSON_LOGOUT_SUCCESS:
		 console.log('lesson logout success reducer')
		 // console.log(action)
		 return{...state,
			 orderSubmitted: false,
			 modalVisible: false,
			 dtl: '',
			 fo: '',
			 fo_flag: false,
			 viewed: '',
			 request_id: '',
			 request_date: '',
			 request_url: '',
			 request_notes: '',
			 response_notes: '',
			 response_video: '',
			 loading: false,
			 pending: [],
			 closed: [],
		 }
	 case SET_FROM:
		 console.log('set from reducer')
		 console.log(action.data.from)
		 return{...state,
			 from: action.data.from,
		 }
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
		case PACKAGE_LOGOUT_SUCCESS:
		 console.log('package logout success reducer')
		 // console.log(action)
		 return{...state,
			 response: null,
			 type: '',
			 value: '',
			 price: 0,
			 name: '',
			 description: '',
			 shortcode: '',
			 packages: [],
		 }
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
			return{...state,
				response: action.data
			}
		case RESET_PASSWORD_FAILURE:
			console.log('reset password failure reducer')
			return state;
		case LOGOUT_SUCCESS:
			console.log('logout success reducer')
			return{...state,
				token: null,
				response: '',
				failCount: 0,
		}
		case LOGOUT_FAILURE:
			console.log('logout failure reducer')
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
