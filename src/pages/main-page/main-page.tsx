import { CardsType } from '../../types/card';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ListOffers from '../../components/main-components/list-offers';
import MapComponent from '../../components/map/map-component';
import Header from '../../components/header/header-component';

type MainPageProps = {
  rentsCard: CardsType;
}

function MainPage({ rentsCard}: MainPageProps): JSX.Element {
  const favoritesArray = rentsCard.filter((item) => item.isFavorite);
  const [cardMouseOver, setCardMouseOver] = useState<string | undefined>('');
  const params = useParams();
  const isId = 'id' in params;
  const handleListItemHover = (listItemCardId: string) => {
    const currentCard = rentsCard.find((item) => item.id === listItemCardId)?.id;
    setCardMouseOver(currentCard);
  };

  const handleListItemOut = () => {
    setCardMouseOver(undefined);
  };

  return (
    <div className="page page--gray page--main">
      <Header isLoggedIn={false} countFavorite={favoritesArray.length}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="visually-hidden places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <ListOffers rentsCard={rentsCard} onListItemHover={handleListItemHover}
                onListItemOut={handleListItemOut} params={isId}
              />


            </section>
            <div className="cities__right-section">
              <MapComponent rentsCard={rentsCard} selectedCard={cardMouseOver} params={isId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
