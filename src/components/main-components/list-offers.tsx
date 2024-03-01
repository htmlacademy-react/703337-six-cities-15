import PlaceCard from './place-card';
import { CardsType } from '../../types/card';
import { useState, MouseEvent } from 'react';

type ListOffersProps = {
  rentsCard: CardsType;
}

function ListOffers({rentsCard} : ListOffersProps): JSX.Element {
  const [cardMouseOver, setCardMouseOver] = useState('');

  return (
    <div onMouseOver={(evt: MouseEvent<HTMLElement>) => {
      const targetArtical = (evt.target as HTMLElement).closest('.place-card');
      if(targetArtical !== null && targetArtical instanceof HTMLElement){
        setCardMouseOver(targetArtical.dataset.id as string);
      }

    }} className="cities__places-list places__list tabs__content"
    >
      {rentsCard.map((item) => (<PlaceCard key = {item.id} cardObj = {item} />))}
    </div>
  );
}

export default ListOffers;
