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
import * as schemas from '../schemas/keychains.js'
import {
    API_BASE_URL,
} from '../settings';

function* fetchKeychains(action){
    try{
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if(http.isSuccessful(response.status)){
            const jsonResult = yield response.json();
            const {
                entities:{keychains},
                result,
            } = normalize(jsonResult, schemas.keychains);
            yield put(actions.completeFetchingKeychains(keychains, result));
        }else{
            const {non_field_errors} = yield response.json;
            yield put(actions.failFetchingKeychains(non_field_errors[0]));
        }
    } catch (error){
        yield put(actions.failFetchingKeychains('Connection failed!'))
    }

}
export function* watchFetchKeychains(){
    yield takeEvery(
        types.FETCH_KEYCHAINS_STARTED,
        fetchKeychains,
    )
}

function* addKeychain(action){
    try{
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if(http.isSuccessful(response.status)){
            const jsonResult = yield response.json();
            yield put(actions.completeAddingKeychain(
                action.payload.id, 
                jsonResult,
                ));
        }else{
            console.log("error");
            const {non_field_errors} = yield response.json;
            yield put(actions.failAddingKeychain(non_field_errors[0]));
        }
    } catch (error){
        yield put(actions.failAddingKeychain('Connection failed!'))
    }
}

export function* watchAddKeychain(){
    yield takeEvery(
        types.ADD_KEYCHAIN_STARTED,
        addKeychain,
    )
}

function* removeKeychain(action){
    try{
        const response = yield call(
            fetch,
            `${API_BASE_URL}/keychains/${action.payload.id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if(http.isSuccessful(response.status)){
            yield put(actions.completeRemovingKeychain());
        }else{
            const {non_field_errors} = yield response.json;
            yield put(actions.failRemovingKeychain(non_field_errors[0]));
        }
    } catch (error){
        yield put(actions.failRemovingKeychain('Connection failed!'))
    }
}

export function* watchRemoveKeychain(){
    yield takeEvery(
        types.REMOVE_KEYCHAIN_STARTED,
        removeKeychain,
    )
}