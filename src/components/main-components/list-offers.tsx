import PlaceCard from './place-card';
import { CardsType } from '../../types/card';
import cn from 'classnames';

type ListOffersProps = {
  rentsCard: CardsType;
  onListItemHover: (listItemCardId: string) => void;
  onListItemOut: () => void;
  params: boolean;
}

function ListOffers({ rentsCard, onListItemHover, onListItemOut, params}: ListOffersProps): JSX.Element {
  // const handleListItemHover = (evt: MouseEvent<HTMLElement>) => {
  //   evt.preventDefault();
  //   onListItemHover((evt.currentTarget as HTMLElement).dataset.id as string);
  // };
  //console.log(Boolean(params));
  return (
    <div className={cn('places__list', {'cities__places-list tabs__content': params, 'near-places__list': !params})}>
      {rentsCard.map((item) => (
        <PlaceCard key={item.id} cardObj={item} onMouseOver={onListItemHover}
          onMouseOut={onListItemOut} params={params}
        />))}
    </div>
  );
}

export default ListOffers;
