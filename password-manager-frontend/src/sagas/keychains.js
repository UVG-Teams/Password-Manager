import {
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';

import * as types from '../types/keychains';
import * as actions from '../actions/keychains';
import * as selectors from '../reducers';
import { normalize } from 'normalizr';
import * as http from '../utils/http';
import * as schemas from '../schemas/keychains'
import {
    API_BASE_URL,
} from '../settings';

function* createKeychain(action){
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/init_keychain/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (http.isSuccessful(response.status)) {
            const jsonResult = yield response.json();
            console.log(jsonResult)
            yield put(actions.completeInitializingKeychain(jsonResult));
        } else {
            const { non_field_errors } = yield response.json;
            yield put(actions.failInitializingKeychain(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failInitializingKeychain('Connection failed!'))
    }
}

export function* watchCreateKeychain(){
    yield takeEvery(
        types.INIT_KEYCHAIN_STARTED,
        createKeychain,
    )
}
