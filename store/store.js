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
        email: '',
        response: ''
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
        details: [],
        count: 0,
        unlimited_count: 0,
        unlimited_expires: 0
    },

    // user's lesson history
    lessons:{
        loading: false,
        pending:[],
        closed:[],
        request_id: '',
        request_date: '',
        request_url: '',
        request_notes: '',
        viewed: '',
        response_notes: '',
        response_video: '',
        fo: '',
        dtl: '',
        fo_flag: false,
        modalVisible: false,
        orderSubmitted: false,
        from: ''
    },

    // swingessentials available lesson packages
    packages:{
      packages: [],
      name: '',
      description: '',
      price: 0,
      discount: '',
      type: '',
      value: '',
      count: '',
      shortcode: '',
      response: '',
    },

    // api validation token
    login:{
        token: null,
        failCount: 0,
        response: ''
    },

    nav: null,
};


export const store = createStore(
    AppReducer,
    initialStore,
    applyMiddleware(thunk)
);
