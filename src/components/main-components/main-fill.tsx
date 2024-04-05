import ListOffers from './list-offers';
import SortingOptions from './sorting-options';
import MapComponent from '../map/map-component';
import { useState } from 'react';
import { getCurrentOffersState, getCityNameState } from '../../store/offers-data/offers-data.selectors';
import { useAppSelector } from '../../hooks/hooks';

type MainPgeFillProps = {
  onFavoriteClick: (isFavorite : boolean) => void;

}

function MainPageFill({onFavoriteClick} : MainPgeFillProps): JSX.Element {
  console.info('<MainFill />: Render');
  const [cardMouseOver, setCardMouseOver] = useState<string | undefined>('');

  const city = useAppSelector(getCityNameState);
  const sortArray = useAppSelector(getCurrentOffersState);

  const handleListItemHover = (listItemCardId: string) => {
    setCardMouseOver(listItemCardId);
  };

  const handleListItemOut = () => {
    setCardMouseOver(undefined);
  };

  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortArray.length} places to stay in {city}</b>
        <SortingOptions />
        <ListOffers rentsCard={sortArray} onListItemHover={handleListItemHover}
          onListItemOut={handleListItemOut} onFavoriteClick={onFavoriteClick}
        />


      </section>
      <div className="cities__right-section">
        <MapComponent rentsCard={sortArray} selectedCard={cardMouseOver} />
      </div>
    </div>
  );
}

export default MainPageFill;
