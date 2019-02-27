import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import rootSaga from './sagas/sagas';

import {BASE_PATH} from './config/global';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter basename={BASE_PATH}>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
  
registerServiceWorker();
