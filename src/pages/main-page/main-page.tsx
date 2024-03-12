import { CardsType } from '../../types/card';

import MainPageFill from '../../components/main-components/main-fill';
import MainPageEmpty from '../../components/main-components/main-empty';
import Header from '../../components/header/header-component';
import Cities from '../../components/cities/list-cities';
import { CITIES } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

type MainPageProps = {
  rentsCard: CardsType;
}

function MainPage({ rentsCard}: MainPageProps): JSX.Element {
  const favoritesArray = rentsCard.filter((item) => item.isFavorite);

  const city = useAppSelector((state) => state.city);
  const cityArray = rentsCard.filter((item) => item.city.name === city);

  return (
    <div className="page page--gray page--main">
      <Header isLoggedIn={false} countFavorite={favoritesArray.length}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Cities cities={CITIES}/>

        <div className="cities">
          {cityArray.length ? <MainPageFill cityArray={cityArray}/> : <MainPageEmpty />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
