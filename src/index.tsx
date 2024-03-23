import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import ErrorMessage from './components/error-message/error-message';
import SuccsesMessage from './components/succses-mesage/succses-message';
import { store } from './store';

import { fetchOffersAction, fetchFavoriteAction, checkAuthAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteAction());
async function ttt (){
  await store.dispatch(checkAuthAction());
  // console.log(store.getState().authorizationStatus);
  // console.log(store.getState().error);

}
ttt();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <SuccsesMessage/>
      <App />
    </Provider>
  </React.StrictMode>
);
