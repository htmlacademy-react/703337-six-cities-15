import { CardsType } from '../../types/card';
import FavoritesCard from './favorite-card';

type FavoritesLocationsProps = {
  rentsLocation: CardsType;
}
function FavoritesLocations({rentsLocation} : FavoritesLocationsProps): JSX.Element {

  return(
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{rentsLocation[0].city.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {rentsLocation.map((item) => (<FavoritesCard key={item.id} cardObj={item}/>))}
      </div>
    </li>);
}

export default FavoritesLocations;

