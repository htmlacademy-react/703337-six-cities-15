import { CardsType } from '../../types/types';
import FavoritesCard from './favorite-card';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FavoritesLocationsProps = {
  onFavoriteClick: (isfavorite: boolean) => void;
  rentsLocation: CardsType;
}
function FavoritesLocations({rentsLocation, onFavoriteClick} : FavoritesLocationsProps): JSX.Element {

  return(
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Root}>
            <span>{rentsLocation[0].city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {rentsLocation.map((item) => (<FavoritesCard key={item.id} cardObj={item} onFavoriteClick={onFavoriteClick}/>))}
      </div>
    </li>);
}

export default FavoritesLocations;

