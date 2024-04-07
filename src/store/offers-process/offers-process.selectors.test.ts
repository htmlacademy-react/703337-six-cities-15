import { NameSpace } from '../../const';
import { expect } from 'vitest';
import { getCurrentSortTypeState } from './offers-process.selectors';


describe('OffersProcess selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      sortType: 'Popular',

    } ,
  };

  it('should return sort type from state', () => {
    const { sortType } = state[NameSpace.Offers];
    const result = getCurrentSortTypeState(state);
    expect(result).toBe(sortType);
  });


});

