import { fork, all } from 'redux-saga/effects';

import {
    watchFetchKeychains,
    watchAddKeychain,
    watchRemoveKeychain,
} from './keychains';

function* mainSaga(){
    yield all([
        fork(watchFetchKeychains),
        fork(watchAddKeychain),
        fork(watchRemoveKeychain),
    ])
}

export default mainSaga;