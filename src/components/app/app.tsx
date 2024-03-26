import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LoginRoute from '../private-route/login-route';
import { useAppSelector } from '../../hooks/hooks';
import ErrorLoad from '../error-message/error-load';
import { AuthorizationStatus } from '../../const';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const isFetchError = useAppSelector((state) => state.isFetchError);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if(isFetchError){
    return <div><ErrorLoad />Это App</div>;
  }

  return (

    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <LoginRoute authorizationStatus={authorizationStatus}>
                <LoginPage />
              </LoginRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
