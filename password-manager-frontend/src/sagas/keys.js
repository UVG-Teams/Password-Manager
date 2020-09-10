import {
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';

import * as types from '../types/keys';
import * as actions from '../actions/keys';
import * as selectors from '../reducers';
import { normalize } from 'normalizr';
import * as schemas from '../schemas/keychains'
import * as http from '../utils/http';
import {
    API_BASE_URL,
} from '../settings';


function* fetchKeys(action){
    try {
        const keychainId = action.payload.id
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/${keychainId}/keys/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (http.isSuccessful(response.status)) {
            const jsonResult = yield response.json();
            const {
                entities: { keys },
                result,
            } = normalize(jsonResult, schemas.keys)
            yield put(actions.completeFetchingKeys(keys, result));
        } else {
            const { non_field_errors } = yield response.json;
            yield put(actions.failFetchingKeys(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failFetchingKeys('Connection failed!'))
    }
}

export function* watchFetchKeys(){
    yield takeEvery(
        types.FETCH_KEYS_STARTED,
        fetchKeys,
    )
}



function* setKey(action){
    try {
        const keychain = yield select(selectors.getKeychain)
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/${keychain.id}/setKey/`,
            {
                method: 'POST',
                body: JSON.stringify({
                    ...action.payload,
                    "derived_password": keychain.derived_password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (http.isSuccessful(response.status)) {
            yield put(actions.completeAddingKey());
            yield put(actions.startFetchingKeys(keychain.id))
        } else {
            const { non_field_errors } = yield response.json;
            yield put(actions.failAddingKey(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failAddingKey('Connection failed!'))
    }
}

export function* watchSetKey(){
    yield takeEvery(
        types.ADD_KEY_STARTED,
        setKey,
    )
}



function* getKeyPassword(action){
    try {
        const keychain = yield select(selectors.getKeychain)
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/${keychain.id}/get/`,
            {
                method: 'POST',
                body: JSON.stringify({
                    ...action.payload,
                    "derived_password": keychain.derived_password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (http.isSuccessful(response.status)) {
            const jsonResult = yield response.json();
            alert(`Password: ${jsonResult}`)
            // yield put(actions.completeGettingKeyPassword());
        } else {
            const { non_field_errors } = yield response.json;
            alert("Esa app no esta registrada.")
            yield put(actions.failGettingKeyPassword(non_field_errors[0]));
        }
    } catch (error) {
        alert("Esa app no esta registrada.")
        yield put(actions.failGettingKeyPassword('Connection failed!'))
    }
}

export function* watchGetKeyPassword(){
    yield takeEvery(
        types.GET_KEY_PASSWORD_STARTED,
        getKeyPassword,
    )
}



function* removeKey(action){
    try {
        const keychain = yield select(selectors.getKeychain)
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/${keychain.id}/remove/`,
            {
                method: 'POST',
                body: JSON.stringify({
                    ...action.payload,
                    "derived_password": keychain.derived_password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (http.isSuccessful(response.status)) {
            yield put(actions.completeRemovingKey());
            yield put(actions.startFetchingKeys(keychain.id))
        } else {
            const { non_field_errors } = yield response.json;
            yield put(actions.failRemovingKey(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failRemovingKey('Connection failed!'))
    }
}

export function* watchRemoveKey(){
    yield takeEvery(
        types.REMOVE_KEY_STARTED,
        removeKey,
    )
}
