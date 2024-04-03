import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
//import { changeCity, filterOffers} from '../../store/action';
import { filterOffers, changeCity } from '../../store/offers-data/offers-data.slice';
import { getCityNameState } from '../../store/offers-data/offers-data.selectors';
import cn from 'classnames';

type CitiesProps = {
  cities: string[];

}

function Cities({cities} : CitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCityNameState);

  const handleListItemClick = (item : string) => {
    dispatch(changeCity(item));
    dispatch(filterOffers());
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((item) =>
            (
              <li key={`${item}location`} className="locations__item" onClick={() => handleListItemClick(item)}>
                <a className={cn('locations__item-link tabs__item', {'tabs__item--active': city === item})} href="#">
                  <span>{item}</span>
                </a>
              </li>
            )
          )}

        </ul>
      </section>
    </div>
  );
}

export default Cities;
