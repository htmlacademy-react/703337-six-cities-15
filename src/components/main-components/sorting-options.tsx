import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

import { SORT } from '../../const';
import { cityNameState, currentSortTypeState } from '../../store/selectors';
import { changeSortType, sortCurrentOffers } from '../../store/action';

function SortingOptions(): JSX.Element {
  const city = useAppSelector(cityNameState);
  const dispatch = useAppDispatch();
  const sortingType = useAppSelector(currentSortTypeState);

  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    dispatch(changeSortType('Popular'));
  }, [city, dispatch]);

  const handleListClick = () =>{
    setOptionsOpen(!optionsOpen);
  };

  const handleListItemClick = (item : string) => {
    dispatch(changeSortType(item));
    dispatch(sortCurrentOffers());
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
          <li onClick={()=> handleListItemClick(item)} key={`${item}Sort`} className={cn('places__option',{'places__option--active': sortingType === item})} tabIndex={0}>{item}</li>
        ))}

      </ul>
    </form>
  );
}

export default SortingOptions;
