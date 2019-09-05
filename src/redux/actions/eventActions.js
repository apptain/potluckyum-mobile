import * as actionKeys from '../actionKeys';

export const eventChange = eventEdit => {
  return {type: actionKeys.eventActionKeys.STORY_CHANGE, eventEdit};
};

export const eventsGet = (apiCall, filter) => {
  return {type: actionKeys.eventActionKeys.STORIES_GET_REQUEST, apiCall, filter};
};

export const eventUpsert = (apiCall, event, token) => {
  return {type: actionKeys.eventActionKeys.STORY_UPSERT_REQUEST, apiCall, event, token};
};

export const eventSelect = (event) => {
  return {type: actionKeys.eventActionKeys.STORY_SELECT, event};
};