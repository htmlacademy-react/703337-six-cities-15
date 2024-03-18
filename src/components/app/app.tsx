import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import LoginRoute from '../private-route/login-route';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { citiesFill } from '../../store/action';
import { arrayOffers } from '../../mocks/offers';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(citiesFill(arrayOffers));
  const offers = useAppSelector((state) => state.offers);

  return (

    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage rentsCard = {offers} />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <LoginRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <LoginPage />
              </LoginRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage rentsCard = {offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage rentsCard = {offers}/>}
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
