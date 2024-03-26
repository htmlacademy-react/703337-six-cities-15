import { CardsType, CardType } from '../../types/card';
import FavoritesLocations from './favorites-location';
import { useAppSelector } from '../../hooks/hooks';
import { favoritesState } from '../../store/selectors';

function FavoritesList(): JSX.Element {
  const favoriteArray = useAppSelector(favoritesState);
  const groupedArrays = favoriteArray.reduce((result: CardsType[], obj : CardType) => {
    const existingArray = result.find((arr : CardsType) => arr[0].city.name === obj.city.name);

    if (existingArray) {
      existingArray.push(obj);
    } else {
      result.push([obj]);
    }

    return result;
  }, []);

  return (
    <ul className="favorites__list">
      {groupedArrays.map((item) => (<FavoritesLocations key = {item[0].city.name} rentsLocation={item}/>))}
    </ul>
  );
}

export default FavoritesList;
