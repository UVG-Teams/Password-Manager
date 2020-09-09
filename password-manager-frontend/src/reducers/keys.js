import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/keys';


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
    case types.ADD_KEY_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.ADD_KEY_COMPLETED: {
      const { tempId, key } = action.payload;
      const newState = omit(state, tempId);
      newState[key.id] = {
        ...key,
        isConfirmed: true,
      };
      return newState;
    }
    case types.REMOVE_KEY_STARTED: {
      return omit(state, action.payload.id);
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
    case types.ADD_KEY_STARTED: {
      return [...state, action.payload.id];
    }
    case types.ADD_KEY_COMPLETED: {
      const { tempId, key } = action.payload;
      return state.map(id => id === tempId ? key.id : id);
    }
    case types.REMOVE_KEY_STARTED: {
      return state.filter(id => id !== action.payload.id);
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