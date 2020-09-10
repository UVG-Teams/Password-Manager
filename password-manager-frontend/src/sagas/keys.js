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
import * as http from '../utils/http';
import {
    API_BASE_URL,
} from '../settings';


function* setKey(action){
    try {
        const keychain = yield select(selectors.getKeychain)

        console.log("payload", action.payload)
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/${keychain.id}/setKey/`,
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
            yield put(actions.completeAddingKey(jsonResult));
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
