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



export const startDumpingKeychain = () => ({
    type: types.DUMP_KEYCHAIN_STARTED,
});

export const completeDumpingKeychain = dump => ({
    type: types.DUMP_KEYCHAIN_COMPLETED,
    payload: dump,
});

export const failDumpingKeychain = error => ({
    type: types.DUMP_KEYCHAIN_FAILED,
    payload: {
        error,
    }
});
