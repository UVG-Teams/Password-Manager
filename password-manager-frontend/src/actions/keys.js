import * as types from '../types/keys';


export const startFetchingKeys = () => ({
  type: types.FETCH_KEYS_STARTED,
});

export const completeFetchingKeys = (entities, order) => ({
  type: types.FETCH_KEYS_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingKeys = error => ({
  type: types.FETCH_KEYS_FAILED,
  payload: {
    error,
  },
});

export const startAddingKey = key => ({
  type: types.ADD_KEY_STARTED,
  payload: key
});
export const completeAddingKey = (tempId, key) => ({
  type: types.ADD_KEY_COMPLETED,
  payload: {
    tempId,
    key,
  },
});
export const failAddingKey = (tempId, error) => ({
  type: types.ADD_KEY_FAILED,
  payload: {
    tempId,
    error,
  },
});

export const startRemovingKey = id => ({
  type: types.REMOVE_KEY_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingKey = () => ({
  type: types.REMOVE_KEY_COMPLETED,
});
export const failRemovingKey = (id, error) => ({
  type: types.REMOVE_KEY_FAILED,
  payload: {
    id,
    error,
  },
});