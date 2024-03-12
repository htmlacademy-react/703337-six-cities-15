import ListOffers from './list-offers';
import { CardsType } from '../../types/card';
import MapComponent from '../map/map-component';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

type MainPageFillProps = {
  cityArray: CardsType;
}

function MainPageFill({cityArray} : MainPageFillProps): JSX.Element {
  const [cardMouseOver, setCardMouseOver] = useState<string | undefined>('');

  const handleListItemHover = (listItemCardId: string) => {
    const currentCard = cityArray.find((item) => item.id === listItemCardId)?.id;
    setCardMouseOver(currentCard);
  };

  const handleListItemOut = () => {
    setCardMouseOver(undefined);
  };
  const city = useAppSelector((state) => state.city);
  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityArray.length} places to stay in {city}</b>
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
        <ListOffers rentsCard={cityArray} onListItemHover={handleListItemHover}
          onListItemOut={handleListItemOut}
        />


      </section>
      <div className="cities__right-section">
        <MapComponent rentsCard={cityArray} selectedCard={cardMouseOver} />
      </div>
    </div>
  );
}

export default MainPageFill;
