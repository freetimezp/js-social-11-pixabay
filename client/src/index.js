import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import myReducer from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
const myStore = createStore(myReducer);

root.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

