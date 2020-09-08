import { combineReducers } from 'redux';

import keychains, * as keychainSelectors from './keychains';

const reducer = combineReducers({
    keychain,
});

export default reducer;

export const getKeychain = (state, id) => keychainSelectors.getKeychain(state.keychains, id);
export const getKeychains = state => keychainSelectors.getKeychains(state.keychains);
export const isFetchingKeychains = state => keychainSelectors.isFetchingKeychains(state.keychains);
export const getFetchingKeychainsError = state => keychainSelectors.getFetchingKeychainsError(state.keychains);