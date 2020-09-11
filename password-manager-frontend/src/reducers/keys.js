import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/keys';
import * as typesKeychains from '../types/keychains';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_KEYS_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = {};
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    isConfirmed: true,
                };
            });
            
            return newState;
        }
        case typesKeychains.LOGOUT_KEYCHAIN: {
            return {}
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_KEYS_COMPLETED: {
            return [...action.payload.order];
        }
        case typesKeychains.LOGOUT_KEYCHAIN: {
            return []
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_KEYS_STARTED: {
            return true;
        }
        case types.FETCH_KEYS_COMPLETED: {
            return false;
        }
        case types.FETCH_KEYS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_KEYS_FAILED: {
            return action.payload.error;
        }
        case types.FETCH_KEYS_STARTED: {
            return null;
        }
        case types.FETCH_KEYS_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};


export default combineReducers({
    byId,
    order,
    isFetching,
    error,
});

export const getKey = (state, id) => state.byId[id];
export const getKeys = state => state.order.map(id => getKey(state, id));
export const isFetchingKeys = state => state.isFetching;
export const getFetchingKeysError = state => state.error;
