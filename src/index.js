import React from 'react';
import ReactDOM from 'react-dom';
import {counter} from './index_redux'
import {createStore} from './my_redux'
import {Provider} from './react_redux'
import App from './App';
import Page from './context_demo';

const store = createStore(counter)
ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'));

