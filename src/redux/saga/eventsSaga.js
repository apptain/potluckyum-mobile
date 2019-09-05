import { take, put, call, fork, select } from 'redux-saga/effects';

import * as actionKeys from '../actionKeys';
import {objectToArray} from "../utils";

function* eventsGetFetch(apiCall, filter) {
  const {response, error} = yield call(apiCall, filter);
  if(response) {
    const events = objectToArray(response);
    yield put({ type: actionKeys.eventActionKeys.STORIES_GET_SUCCESS, events})
  } else {
    yield put({ type: actionKeys.eventActionKeys.STORIES_GET_FAILURE, error})
  }
}

export function* watchEventsGetRequest() {
  while (true) {
    const { apiCall, filter } = yield take(actionKeys.eventActionKeys.STORIES_GET_REQUEST);
    yield fork(eventsGetFetch, apiCall, filter);
  }
}

function* eventUpsertFetch(apiCall, event, token) {
  const {response, error} = yield call(apiCall, event, token);
  if(response) {
    const event = response;
    yield put({ type: actionKeys.eventActionKeys.STORY_UPSERT_SUCCESS, event})
  } else {
    yield put({ type: actionKeys.eventActionKeys.STORY_UPSERT_FAILURE, error})
  }
}

export function* watchEventUpsertRequest() {
  while (true) {
    const { apiCall, event, token } = yield take(actionKeys.eventActionKeys.STORY_UPSERT_REQUEST);
    yield fork(eventUpsertFetch, apiCall, event, token);
  }
}