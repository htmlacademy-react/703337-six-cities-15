import MainPageFill from '../../components/main-components/main-fill';
import { fetchFavoriteAction } from '../../store/api-actions';
import { useEffect } from 'react';
import MainPageEmpty from '../../components/main-components/main-empty';
import Header from '../../components/header/header-component';
import { AuthorizationStatus } from '../../const';
import Cities from '../../components/cities/list-cities';
import { authorizationStatusState, currentOffersState } from '../../store/selectors';
import { CITIES } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import cn from 'classnames';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityArray = useAppSelector(currentOffersState);
  const authStatus = useAppSelector(authorizationStatusState);
  console.log(authStatus);

  // useEffect(() => {
  //   if(authStatus === AuthorizationStatus.Auth){
  //     dispatch(fetchFavoriteAction());
  //   }
  // }, []);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={cn('page__main page__main--index', {'page__main--index-empty': !cityArray.length})}>
        <h1 className="visually-hidden">Cities</h1>
        <Cities cities={CITIES} />

        <div className="cities">
          {cityArray.length ? <MainPageFill /> : <MainPageEmpty />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
