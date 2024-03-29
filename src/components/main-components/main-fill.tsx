import ListOffers from './list-offers';
import SortingOptions from './sorting-options';
import { CardsType } from '../../types/card';
import MapComponent from '../map/map-component';
import { useState } from 'react';
//import { changeCurrentOffers } from '../../store/action';
import { cityNameState, currentOffersState } from '../../store/selectors';
//import { sortByPriceHigh,sortByPriceLow,sortByPriceRate } from '../../util';
//import { SortType } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

type MainPageFillProps = {
  cityArray: CardsType;
}

function MainPageFill({cityArray} : MainPageFillProps): JSX.Element {
  const [cardMouseOver, setCardMouseOver] = useState<string | undefined>('');
  const city = useAppSelector(cityNameState);
  //const sortType = useAppSelector(currentSortTypeState);
  const sortArray = useAppSelector(currentOffersState);

  const handleListItemHover = (listItemCardId: string) => {
    const currentCard = cityArray.find((item) => item.id === listItemCardId)?.id;
    setCardMouseOver(currentCard);
  };

  const handleListItemOut = () => {
    setCardMouseOver(undefined);
  };

  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityArray.length} places to stay in {city}</b>
        <SortingOptions />
        <ListOffers rentsCard={sortArray} onListItemHover={handleListItemHover}
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
