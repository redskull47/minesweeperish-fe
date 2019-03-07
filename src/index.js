import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import { StoreContext } from 'redux-react-hook';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import rootSaga from './sagas/sagas';

import {BASE_PATH} from './config/global';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter basename={BASE_PATH}>
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      <Route component={App} />
    </StoreContext.Provider>
  </Provider>
  </BrowserRouter>, document.getElementById('root'));
  
registerServiceWorker();
