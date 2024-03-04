import { CardsType, CardType } from '../../types/card';
import FavoritesLocations from './favorites-location';

type FavoritesListProps = {
  rentsCard: CardsType;
}

function FavoritesList({rentsCard} : FavoritesListProps): JSX.Element {
  const favoriteArray = rentsCard.filter((item) => item.isFavorite);
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
