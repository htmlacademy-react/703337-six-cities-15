import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCity} from '../../store/action';
import { MouseEvent } from 'react';
import { cityNameState } from '../../store/selectors';
//import { CardsType } from '../../types/card';
import cn from 'classnames';

type CitiesProps = {
  cities: string[];

}

function Cities({cities} : CitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(cityNameState);

  const handleListItemClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const cityName = evt.target as HTMLElement;
    dispatch(changeCity(cityName.innerText));

    //console.log(store.getState());
  };
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((item) =>
            (
              <li key={`${item}location`} className="locations__item" onClick={handleListItemClick}>
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
