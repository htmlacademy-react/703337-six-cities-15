import MainPageFill from '../../components/main-components/main-fill';

import MainPageEmpty from '../../components/main-components/main-empty';
import Header from '../../components/header/header-component';
import Cities from '../../components/cities/list-cities';
import { currentOffersState } from '../../store/selectors';
import { CITIES } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import cn from 'classnames';

function MainPage(): JSX.Element {
  console.info('<MainPage />: Render');
  const cityArray = useAppSelector(currentOffersState);

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
