import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import ErrorMessage from './components/error-message/error-message';
import SuccessMessage from './components/success-mesage/success-message';
import { store } from './store';
import { AuthorizationStatus } from './const';
import { fetchOffersAction, fetchFavoriteAction, checkAuthAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
//store.dispatch(fetchFavoriteAction());
const authStatus = store.getState().authorizationStatus;
console.log(authStatus);
console.log(store.getState().login)


//store.dispatch(fetchFavoriteAction());
//fff();

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
