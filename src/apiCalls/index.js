import {callApi} from './utils';
import * as endpoints from './endpoints';

//callApi gets lost from scope in apiCalls without this
const scopedCallApi = callApi;

export const eventsGet = filter => {
  //TODO pass and handle filter
  return scopedCallApi(endpoints.eventsGetUrl);
};

export const eventUpsert = (event, token) => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${token}` };
  return scopedCallApi(endpoints.eventUpsertUrl, 'POST', JSON.stringify(event), headers);
};

export const profileGet = jwt => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${jwt}` };
  return scopedCallApi(endpoints.profileGetUrl, null, null, headers);
};
