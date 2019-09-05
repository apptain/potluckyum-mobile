import { AsyncStorage } from "react-native";
import devTools from "remote-redux-devtools";
import createSagaMiddleware, { END } from 'redux-saga';
import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import saga from "./saga";

import { persistReducer } from "redux-persist";
import createSensitiveStorage from "redux-persist-sensitive-storage";

import { authReducer, eventReducer } from "./reducers";

const sensitiveStorage = createSensitiveStorage({
  keychainService: "OpenEvent",
  sharedPreferencesName: "OpenEvent Preferences"
});

const eventPersistConfig = {
  key: "events",
  storage: AsyncStorage
};

const authPersistConfig = {
  key: "auth",
  storage: sensitiveStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  event: persistReducer(eventPersistConfig, eventReducer)
});

export default function configureStore(onCompletion: () => void): any {
  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    devTools({
      name: "OpenEvent",
      realtime: true
    })
  );

  const store = createStore(rootReducer, enhancer);

  store.runSaga =  sagaMiddleware.run(saga);
  store.close = () => store.dispatch(END);

  let persistor = persistStore(store);
  return { persistor, store };
}
