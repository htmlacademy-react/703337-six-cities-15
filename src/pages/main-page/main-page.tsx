import MainPageFill from '../../components/main-components/main-fill';
import MainPageEmpty from '../../components/main-components/main-empty';
import Header from '../../components/header/header-component';
import Cities from '../../components/cities/list-cities';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { getCurrentOffersState, getFavoritesState } from '../../store/offers-data/offers-data.selectors';
import { CITIES } from '../../const';
import cn from 'classnames';

function MainPage(): JSX.Element {
  console.info('<MainPage />: Render');

  const cityArray = useAppSelector(getCurrentOffersState);
  const favoritesArray = useAppSelector(getFavoritesState);

  const initialCount = favoritesArray.length;

  const [currentFavorites, setCurrentFavorites] = useState(initialCount);

  const handleFavoriteClick = (isFavorite : boolean) => {
    setCurrentFavorites((prev) => isFavorite ? prev + 1 : prev - 1);
  };

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className={cn('page__main page__main--index', {'page__main--index-empty': !cityArray.length})}>
        <h1 className="visually-hidden">Cities</h1>
        <Cities cities={CITIES} />

        <div className="cities">
          {cityArray.length ? <MainPageFill onFavoriteClick={handleFavoriteClick}/> : <MainPageEmpty />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
