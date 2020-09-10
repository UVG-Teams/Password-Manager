import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/keychains';


const keychain = (state = null, action) => {
    switch(action.type) {
        case types.INIT_KEYCHAIN_STARTED: {
            return {
                ...action.payload,
                isConfirmed: false
            };
        }
        case types.INIT_KEYCHAIN_COMPLETED: {
            return {
                ...action.payload,
                isConfirmed: true,
            };
        }
        case types.INIT_KEYCHAIN_FAILED: {
            return {};
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
