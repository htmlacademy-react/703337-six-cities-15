import PlaceCard from './place-card';
import { CardsType } from '../../types/card';

type ListOffersProps = {
  rentsCard: CardsType;
}

function ListOffers({ rentsCard }: ListOffersProps): JSX.Element {


  return (
    <div className="cities__places-list places__list tabs__content">
      {rentsCard.map((item) => (<PlaceCard key={item.id} cardObj={item} />))}
    </div>
  );
}

export default ListOffers;
