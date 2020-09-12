import * as types from '../types/keys';


export const startFetchingKeys = id => ({
    type: types.FETCH_KEYS_STARTED,
    payload: {
        id,
    }
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

export const completeAddingKey = () => ({
    type: types.ADD_KEY_COMPLETED,
});

export const failAddingKey = (tempId, error) => ({
    type: types.ADD_KEY_FAILED,
    payload: {
        tempId,
        error,
    },
});



export const startGettingKeyPassword = keyName => ({
    type: types.GET_KEY_PASSWORD_STARTED,
    payload: {
        keyName,
    }
});

export const completeGettingKeyPassword = keyPassword => ({
    type: types.GET_KEY_PASSWORD_COMPLETED,
    payload: {
        keyPassword,
    }
});

export const failGettingKeyPassword = error => ({
    type: types.GET_KEY_PASSWORD_FAILED,
    payload: {
        error,
    },
});



export const startRemovingKey = keyName => ({
    type: types.REMOVE_KEY_STARTED,
    payload: {
        keyName,
    },
});

export const completeRemovingKey = () => ({
    type: types.REMOVE_KEY_COMPLETED,
});

export const failRemovingKey = error => ({
    type: types.REMOVE_KEY_FAILED,
    payload: {
        error,
    },
});



export const startDecodingKeys = apps => ({
    type: types.DECODE_KEYS_STARTED,
    payload: {
        apps,
    },
});

export const completeDecodingKeys = decodedApps => ({
    type: types.DECODE_KEYS_COMPLETED,
    payload: {
        decodedApps,
    }
});

export const failDecodingKeys = error => ({
    type: types.DECODE_KEYS_FAILED,
    payload: {
        error,
    },
});
