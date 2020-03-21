import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root.reducer';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();

export const initStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
