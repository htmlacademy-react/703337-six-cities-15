import MainPageFill from '../../components/main-components/main-fill';
import MainPageEmpty from '../../components/main-components/main-empty';
import Header from '../../components/header/header-component';
import Cities from '../../components/cities/list-cities';
import { currentOffersState, offersState } from '../../store/selectors';
import { CITIES } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import cn from 'classnames';

function MainPage(): JSX.Element {
  const cities = useAppSelector(offersState);
  const cityArray = useAppSelector(currentOffersState);
  const favoritesArray = cities.filter((item) => item.isFavorite);

  return (
    <div className="page page--gray page--main">
      <Header countFavorite={favoritesArray.length}/>

      <main className={cn('page__main page__main--index', {'page__main--index-empty': !cityArray.length})}>
        <h1 className="visually-hidden">Cities</h1>
        <Cities cities={CITIES} />

        <div className="cities">
          {cityArray.length ? <MainPageFill cityArray={cityArray}/> : <MainPageEmpty />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
