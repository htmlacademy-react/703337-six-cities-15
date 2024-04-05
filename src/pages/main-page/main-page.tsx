import MainPageFill from '../../components/main-components/main-fill';
import MainPageEmpty from '../../components/main-components/main-empty';
import Header from '../../components/header/header-component';
import { HeaderMemo } from '../../components/header/header-component';
import Cities from '../../components/cities/list-cities';
import { useState } from 'react';
import { statusFavoritesActionMainPage } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getCurrentOffersState, getFavoritesState } from '../../store/offers-data/offers-data.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { CITIES } from '../../const';

import cn from 'classnames';

function MainPage(): JSX.Element {
  console.info('<MainPage />: Render');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorization = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const cityArray = useAppSelector(getCurrentOffersState);
  const favoritesArray = useAppSelector(getFavoritesState);

  const initialCount = favoritesArray.length;
  //console.log(initialCount)

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
