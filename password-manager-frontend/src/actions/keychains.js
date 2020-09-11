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
    payload: {
        error,
    }
});



export const loggingOutKeychain = () => ({
    type: types.LOGOUT_KEYCHAIN,
});




export const startLoadingKeychain = (password, keychainFile) => ({
    type: types.LOAD_KEYCHAIN_STARTED,
    payload: {
        password,
        keychainFile,
    }
});

export const completeLoadingKeychain = keychain => ({
    type: types.LOAD_KEYCHAIN_COMPLETED,
    payload: keychain
});

export const failLoadingKeychain = error => ({
    type: types.LOAD_KEYCHAIN_FAILED,
    payload: {
        error,
    }
});