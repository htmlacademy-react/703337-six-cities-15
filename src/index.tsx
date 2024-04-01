import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import ErrorMessage from './components/error-message/error-message';
import SuccessMessage from './components/success-mesage/success-message';
import { store } from './store';
import { offersData } from './store/offers-data/offers-data.slice';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
alert('jjj')
store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
console.log('444')
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <SuccessMessage/>
      <App />
    </Provider>
  </React.StrictMode>
);
