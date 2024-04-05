import { CardsType } from '../../types/types';
import FavoritesCard from './favorite-card';

type FavoritesLocationsProps = {
  onFavoriteClick: (isfavorite: boolean) => void;
  rentsLocation: CardsType;
}
function FavoritesLocations({rentsLocation, onFavoriteClick} : FavoritesLocationsProps): JSX.Element {

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
        {rentsLocation.map((item) => (<FavoritesCard key={item.id} cardObj={item} onFavoriteClick={onFavoriteClick}/>))}
      </div>
    </li>);
}

export default FavoritesLocations;

