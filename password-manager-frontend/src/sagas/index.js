import { fork, all } from 'redux-saga/effects';

import {
    watchCreateKeychain,
} from './keychains';

import {
    watchSetKey,
    watchFetchKeys,
} from './keys'

function* mainSaga(){
    yield all([
        fork(watchCreateKeychain),
        fork(watchSetKey),
        fork(watchFetchKeys),
    ])
}

export default mainSaga;
