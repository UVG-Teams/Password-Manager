import * as types from '../types/keychains';

export const startInitializingKeychain = password => ({
    type: types.INIT_KEYCHAIN_STARTED,
    payload: {
        password,
    }
});

export const completeInitializingKeychain = keychain => ({
    type: types.INIT_KEYCHAIN_COMPLETED,
    payload: keychain
});

export const failInitializingKeychain = error => ({
    type: types.INIT_KEYCHAIN_FAILED,
    payload: error
});
