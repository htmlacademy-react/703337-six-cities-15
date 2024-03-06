import PlaceCard from './place-card';
import { CardsType } from '../../types/card';
import { MouseEvent } from 'react';

type ListOffersProps = {
  rentsCard: CardsType;
  onListItemHover: (listItemCardId: string) => void;
  onListItemOut: () => void;
}

function ListOffers({ rentsCard, onListItemHover, onListItemOut }: ListOffersProps): JSX.Element {
  const handleListItemHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    onListItemHover((evt.currentTarget as HTMLElement).dataset.id as string);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {rentsCard.map((item) => (
        <PlaceCard key={item.id} cardObj={item} onMouseOver={handleListItemHover}
          onMouseOut={onListItemOut}
        />))}
    </div>
  );
}

export default ListOffers;
