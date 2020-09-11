import { fork, all } from 'redux-saga/effects';

import {
    watchCreateKeychain,
    watchLoadKeychain,
} from './keychains';

import {
    watchSetKey,
    watchFetchKeys,
    watchGetKeyPassword,
    watchRemoveKey,
} from './keys'

function* mainSaga(){
    yield all([
        fork(watchCreateKeychain),
        fork(watchSetKey),
        fork(watchFetchKeys),
        fork(watchGetKeyPassword),
        fork(watchRemoveKey),
        fork(watchLoadKeychain),
    ])
}

export default mainSaga;
