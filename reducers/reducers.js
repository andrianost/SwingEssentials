import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../navigators/AppNavigator.js';

import {LOGIN_SUCCESS, LOGIN_ERROR} from '../actions/actions.js';

const userReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
			return{...state,
				username: action.data.personal.username
			};
		default:
			return state;
	}
}
const settingsReducer = (state=[], action) => {
	return state;
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
			return{...state,
				token: null,
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
