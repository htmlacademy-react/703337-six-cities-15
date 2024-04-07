import { offersProcess, changeSortType } from './offers-process.slice';

describe('OffersProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      sortType: '',
    };

    const result = offersProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { sortType: 'q', };

    const result = offersProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change sort type with "changeSortType" action', () => {
    const initialState = { sortType: 'high to low', };
    const expectedState = { sortType: 'low to high', };

    const result = offersProcess.reducer(initialState, changeSortType('low to high'));

    expect(result).toEqual(expectedState);
  });
});

