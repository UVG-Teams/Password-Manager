import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/keychains';


const keychain = (state = null, action) => {
    switch(action.type) {
        case types.INIT_KEYCHAIN_STARTED: {
            return null;
        }
        case types.LOAD_KEYCHAIN_STARTED: {
            return null;
        }
        case types.INIT_KEYCHAIN_COMPLETED: {
            return {
                ...action.payload,
            };
        }
        case types.LOAD_KEYCHAIN_COMPLETED: {
            return {
                ...action.payload,
            };
        }
        case types.INIT_KEYCHAIN_FAILED: {
            return null;
        }
        case types.LOGOUT_KEYCHAIN: {
            return null;
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({
    keychain,
});

export const getKeychain = state => state.keychain;
