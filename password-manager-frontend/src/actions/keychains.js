import * as types from '../types/keychains';


export const startFetchingKeychains = () => ({
  type: types.FETCH_KEYCHAINS_STARTED,
});

export const completeFetchingKeychains = (entities, order) => ({
  type: types.FETCH_KEYCHAINS_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingKeychains = error => ({
  type: types.FETCH_KEYCHAINS_FAILED,
  payload: {
    error,
  },
});

export const startAddingKeychain = keychain => ({
  type: types.ADD_KEYCHAIN_STARTED,
  payload: keychain
});
export const completeAddingKeychain = (tempId, keychain) => ({
  type: types.ADD_KEYCHAIN_COMPLETED,
  payload: {
    tempId,
    keychain,
  },
});
export const failAddingKeychain = (tempId, error) => ({
  type: types.ADD_KEYCHAIN_FAILED,
  payload: {
    tempId,
    error,
  },
});

export const startRemovingKeychain = id => ({
  type: types.REMOVE_KEYCHAIN_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingKeychain = () => ({
  type: types.REMOVE_KEYCHAIN_COMPLETED,
});
export const failRemovingKeychain = (id, error) => ({
  type: types.REMOVE_KEYCHAIN_FAILED,
  payload: {
    id,
    error,
  },
});