import { HeaderMemo } from '../../components/header/header-component';

import { getFavoritesState } from '../../store/offers-data/offers-data.selectors';
import FavoritesList from '../../components/favorites-component/list-favorites-component';
import { useAppSelector } from '../../hooks/hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { AuthorizationStatus } from '../../const';
import FavoritesPageEmpty from './favorites-empty-page';
import { useState } from 'react';
import { getIsFetchError } from '../../store/offers-data/offers-data.selectors';
import LoadingLogoutScreen from '../loading-screen/logout-load';

function FavoritesPage(): JSX.Element {
  
  const favoritesArray = useAppSelector(getFavoritesState);
  const initialCount = favoritesArray.length;
  const isAuthorization = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const [currentFavorites, setCurrentFavorites] = useState(initialCount);

 

  const handleFavoriteClick = (isfavorite : boolean) => {
    setCurrentFavorites(isfavorite ? currentFavorites + 0 : currentFavorites - 1);
  };

  if(favoritesArray.length === 0) {
    return (
      <FavoritesPageEmpty />
    );
  }

  return (
    <div className="page">
      <HeaderMemo favorites={initialCount} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList onFavoriteClick={handleFavoriteClick}/>

          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
