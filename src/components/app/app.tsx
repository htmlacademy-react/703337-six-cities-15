import {Route, Routes} from 'react-router-dom';
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
import LoadingLogoutScreen from '../../pages/loading-screen/logout-load';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getOffersDataLoadingState } from '../../store/offers-data/offers-data.selectors';
import { getIsFetchLogout } from '../../store/offers-data/offers-data.selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingState);
  const isFetchLogout = useAppSelector(getIsFetchLogout);
  if(isFetchLogout){
    return <div><LoadingLogoutScreen /></div>;
  }

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (

    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
