import { useState, useEffect } from 'react';

import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { MouseEvent } from 'react';
import { SORT } from '../../const';
//import { CardsType } from '../../types/card';
import { cityNameState } from '../../store/selectors';
import { changeSortType } from '../../store/action';
//import { store } from '../../store';
//import { sortByPriceHigh, sortByPriceLow, sortByPriceRate } from '../../util';

// type SortProps = {
//   rentsCard: CardsType;
// }

function SortingOptions(): JSX.Element {
  const city = useAppSelector(cityNameState);
  const dispatch = useAppDispatch();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [sortingType, setSortingType] = useState('Popular');
  dispatch(changeSortType(sortingType));

  useEffect(() => {
    setSortingType('Popular');
  }, [city]);

  const handleListClick = () => {
    setOptionsOpen(!optionsOpen);
  };

  const handleListItemClick = (evt: MouseEvent<HTMLElement>) => {
    const sortValue = evt.target as HTMLElement;
    setSortingType(sortValue.innerText);
    setOptionsOpen(false);

  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleListClick}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom ',{'places__options--opened': optionsOpen})}>
        {SORT.map((item) => (
          <li onClick={handleListItemClick} key={`${item}Sort`} className={cn('places__option',{'places__option--active': sortingType === item})} tabIndex={0}>{item}</li>
        ))}

      </ul>
    </form>
  );
}

export default SortingOptions;
