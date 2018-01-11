import { createStore, applyMiddleware} from 'redux'
import AppReducer from '../reducers/reducers.js'
import thunk from 'redux-thunk';

// The initial state of the store
export const initialStore = {

    // user personal information
    userData:{
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    },

    // user settings
    settings:{
        avatar: '',
        handedness: 'right',
        camera:{
            delay: 5,
            duration: 8,
            overlay: false
        }
    },

    // user's available credits
    credits:{
        count: 0,
        albatross: false,
        albatrossExpires: 0
    },

    // user's lesson history
    lessons:{
        loading: false,
        pending:[],
        closed:[],
        request_id: '',
        request_date: '',
        request_url: ''
    },

    // swingessentials available lesson packages
    packages:{
      packages: [],
      name: '',
      description: '',
      price: 0
    },

    // api validation token
    login:{
        token: null,
        failCount: 0
    },

    nav: null,
};


export const store = createStore(
    AppReducer,
    initialStore,
    applyMiddleware(thunk)
);
