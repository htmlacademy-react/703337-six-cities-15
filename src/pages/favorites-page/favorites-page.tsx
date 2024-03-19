import { CardsType } from '../../types/card';
import Header from '../../components/header/header-component';
import FavoritesList from '../../components/favorites-component/list-favorites-component';
import { useAppSelector } from '../../hooks/hooks';
import { offersState } from '../../store/selectors';

type FavoritesPageProps = {
  rentsCard: CardsType;
}

function FavoritesPage(): JSX.Element {
  const cities = useAppSelector(offersState);
  const favoritesArray = cities.filter((item) => item.isFavorite);
  return (
    <div className="page">
      <Header isLoggedIn={false} countFavorite={favoritesArray.length} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList rentsCard={rentsCard}/>

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
