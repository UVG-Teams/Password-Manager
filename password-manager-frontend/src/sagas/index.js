import { fork, all } from 'redux-saga/effects';

import {
    watchCreateKeychain,
} from './keychains';

import {
    watchSetKey,
} from './keys'

function* mainSaga(){
    yield all([
        fork(watchCreateKeychain),
        fork(watchSetKey)
    ])
}

export default mainSaga;
