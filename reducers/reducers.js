import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../navigators/AppNavigator.js';

import {LOGIN_SUCCESS, LOGIN_ERROR, GET_SETTINGS_SUCCESS, GET_SETTINGS_FAILURE, PUT_SETTINGS_SUCCESS, PUT_SETTINGS_FAILURE} from '../actions/actions.js';

const userReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
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
		console.log(action.data);
		console.log(action.data.handed);
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
	return state;
}
const lessonsReducer = (state=[], action) => {
	return state;
}
const packagesReducer = (state=[], action) => {
	return state;
}
const loginReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
		// console.log(action.data.token);
			return{...state,
				token: action.data.token,
				failCount: 0
			}
		case LOGIN_ERROR:
			return{...state,
				token: null,
				failCount: state.failCount + 1
			}
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
