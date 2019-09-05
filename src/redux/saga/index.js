import { take, put, call, fork, select, all } from 'redux-saga/effects';

import {watchEventsGetRequest, watchEventUpsertRequest} from './eventsSaga';
import {watchProfileGetRequest} from './authSaga';

export default function* root() {
  yield all([
    fork(watchEventsGetRequest),
    fork(watchEventUpsertRequest),
    fork(watchProfileGetRequest)
  ]);
}
