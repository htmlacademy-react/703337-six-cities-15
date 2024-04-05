import { NameSpace } from '../../const';
import { expect } from 'vitest';
import { getCurrentSortTypeState, getError } from './offers-process.selectors';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('OffersProcess selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      sortType: 'Popular',
      error: 'ttt',
    } ,
  };

  it('should return sort type from state', () => {
    const { sortType } = state[NameSpace.Offers];
    const result = getCurrentSortTypeState(state);
    expect(result).toBe(sortType);
  });

  it('should return error string from state', () => {
    const { error } = state[NameSpace.Offers];
    const result = getError(state);
    expect(result).toBe(error);
  });
});

