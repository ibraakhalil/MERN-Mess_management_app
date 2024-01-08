import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/store';
import { decodeToken, isExpired } from 'react-jwt'
import { SET_USER } from './store/constants/types';
import setAuthHeaders from './utils/setAuthHeaders';


const token = localStorage.getItem('token')
if (token) {
  if (isExpired(token)) {
    localStorage.removeItem('token')
  } else {
    const user = decodeToken(token)
    setAuthHeaders()
    store.dispatch({
      type: SET_USER,
      payload: user
    })
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
