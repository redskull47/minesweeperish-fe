import React from 'react';
import ReactDOM from 'react-dom';
import  { BrowserRouter } from 'react-router-dom';

import { StoreContext } from 'redux-react-hook';
import { Provider } from 'react-redux';

import store from 'config/store';
import routes from 'config/routes';

import { BASE_PATH } from './config/paths';

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter basename={BASE_PATH}>
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      {routes}
    </StoreContext.Provider>
  </Provider>
  </BrowserRouter>, document.getElementById('root'));

// registerServiceWorker();
