import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <div className='app-container bg-slate-950'>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);