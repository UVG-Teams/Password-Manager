import { fork, all } from 'redux-saga/effects';

import {
    watchCreateKeychain,
    watchDumpKeychain,
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
        fork(watchDumpKeychain),
        fork(watchSetKey),
        fork(watchFetchKeys),
        fork(watchGetKeyPassword),
        fork(watchRemoveKey),
    ])
}

export default mainSaga;
