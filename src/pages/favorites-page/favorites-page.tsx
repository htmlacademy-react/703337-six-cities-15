import Header from '../../components/header/header-component';
import { favoritesState } from '../../store/selectors';
import FavoritesList from '../../components/favorites-component/list-favorites-component';
import { useAppSelector } from '../../hooks/hooks';

import FavoritesPageEmpty from './favorites-empty-page';

function FavoritesPage(): JSX.Element {

  const favoritesArray = useAppSelector(favoritesState);
  if(favoritesArray.length === 0) {
    return (
      <FavoritesPageEmpty />
    );
  }
  return (
    <div className="page">
      <Header favorites={favoritesArray.length} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList />

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
