import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/keychains';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_KEYCHAINS_COMPLETED: {
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
    case types.ADD_KEYCHAIN_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.ADD_KEYCHAIN_COMPLETED: {
      const { tempId, keychain } = action.payload;
      const newState = omit(state, tempId);
      newState[keychain.id] = {
        ...keychain,
        isConfirmed: true,
      };
      return newState;
    }
    case types.REMOVE_KEYCHAIN_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_KEYCHAINS_COMPLETED: {
      return [...action.payload.order];
    }
    case types.ADD_KEYCHAIN_STARTED: {
      return [...state, action.payload.id];
    }
    case types.ADD_KEYCHAIN_COMPLETED: {
      const { tempId, keychain } = action.payload;
      return state.map(id => id === tempId ? keychain.id : id);
    }
    case types.REMOVE_KEYCHAIN_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.FETCH_KEYCHAINS_STARTED: {
      return true;
    }
    case types.FETCH_KEYCHAINS_COMPLETED: {
      return false;
    }
    case types.FETCH_KEYCHAINS_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.FETCH_KEYCHAINS_FAILED: {
      return action.payload.error;
    }
    case types.FETCH_KEYCHAINS_STARTED: {
      return null;
    }
    case types.FETCH_KEYCHAINS_COMPLETED: {
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

export const getKeychain = (state, id) => state.byId[id];
export const getKeychains = state => state.order.map(id => getKeychain(state, id));
export const isFetchingKeychains = state => state.isFetching;
export const getFetchingKeychainsError = state => state.error;