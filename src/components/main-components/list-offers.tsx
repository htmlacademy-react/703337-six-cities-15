import PlaceCard from './place-card';
import { CardsType } from '../../types/card';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

type ListOffersProps = {
  rentsCard: CardsType;
  onListItemHover: (listItemCardId: string) => void;
  onListItemOut: () => void;
}

function ListOffers({ rentsCard, onListItemHover, onListItemOut}: ListOffersProps): JSX.Element {
  const location = useLocation().pathname === '/';

  return (
    <div className={cn('places__list', {'cities__places-list tabs__content': location, 'near-places__list': !location})}>
      {rentsCard.map((item) => (
        <PlaceCard key={item.id} cardObj={item} onMouseOver={onListItemHover}
          onMouseOut={onListItemOut}
        />))}
    </div>
  );
}

export default ListOffers;
