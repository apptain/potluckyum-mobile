import * as actionKeys from '../actionKeys';

const init = {
  eventsFilter: '',
  events: [],
  eventsLoading: false,
  categories: [],
  categoriesLoading: false,
  event: {},
  eventEdit: {},
  eventUpserting: false,
  exception: null,
}

export default (state = init, action) => {
  switch (action.type) {
    case actionKeys.eventActionKeys.STORY_CHANGE:
      return {...state, eventEdit: action.eventEdit};
    case actionKeys.eventActionKeys.STORIES_GET_REQUEST:
      return { ...state, eventsLoading : true};
    case actionKeys.eventActionKeys.STORIES_GET_SUCCESS:
      return { ...state, events: action.events, eventsLoading: false};
    case actionKeys.eventActionKeys.STORIES_GET_FAILURE:
      //TODO add toast notifications
      return { ...state, exception: action.exception, eventsLoading: false};
    case actionKeys.eventActionKeys.STORY_UPSERT_REQUEST:
      return { ...state, eventUpserting : true};
    case actionKeys.eventActionKeys.STORY_UPSERT_SUCCESS:
      return { ...state, event: action.event, eventUpserting: false, eventEdit: {}, events: [...state.events, action.event]};
    case actionKeys.eventActionKeys.STORY_UPSERT_FAILURE:
      //TODO add toast notifications
      return { ...state, exception: action.exception, eventUpserting: false};
    case actionKeys.eventActionKeys.STORY_UPSERT_FAILURE:
      //TODO add toast notifications
      return { ...state, exception: action.exception, eventUpserting: false};
    case actionKeys.eventActionKeys.CATEGORIES_GET_REQUEST:
      return { ...state, categoriesLoading : true};
    case actionKeys.eventActionKeys.CATEGORIES_GET_SUCCESS:
      return { ...state, categories: action.categories, categoriesLoading: false};
    case actionKeys.eventActionKeys.CATEGORIES_GET_FAILURE:
      //TODO add toast notifications
    case actionKeys.eventActionKeys.STORY_SELECT:
      return {...state, event: action.event};
    default:
      return state
  }
};