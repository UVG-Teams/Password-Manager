import { combineReducers } from 'redux';

import keychains, * as keychainSelectors from './keychains';
import keys, * as keySelectors from './keys';

const reducer = combineReducers({
    keychains,
    keys,
});

export default reducer;

export const getKeychain = state => keychainSelectors.getKeychain(state.keychains);

export const getKey = (state, id) => keySelectors.getKey(state.keys, id)
export const getKeys = state => keySelectors.getKeys(state.keys)
export const isFetchingKeys = state => keySelectors.isFetchingKeys(state.keys)
export const getFetchingKeysError = state => keySelectors.getFetchingKeysError(state.keys)
export const getdecodedKeys = state => keySelectors.getdecodedKeys(state.keys)
