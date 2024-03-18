import { CardType, CardsType } from './types/card';
import { SortType } from './const';

const sortByPriceLow = (a : CardType, b : CardType) => {
  if (a.price > b.price) {
    return 1;
  }

  if (a.price < b.price) {
    return -1;
  }

  return 0;
};

const sortByPriceHigh = (a : CardType, b : CardType) => {
  if (b.price > a.price) {
    return 1;
  }

  if (b.price < a.price) {
    return -1;
  }

  return 0;
};

const sortByPriceRate = (a : CardType, b : CardType) => {
  if (b.rating > a.rating) {
    return 1;
  }

  if (b.rating < a.rating) {
    return -1;
  }

  return 0;
};

const sortObj = (sortType : string, sortArray : CardsType) => {
  switch (sortType) {
    case SortType.Low:
      return sortArray.sort(sortByPriceLow);
      break;
    case SortType.High:
      return sortArray.sort(sortByPriceHigh);
      break;
    case SortType.Rating:
      return sortArray.sort(sortByPriceRate);
      break;
    default:
      return sortArray;
  }
};

export {sortByPriceHigh, sortByPriceLow, sortByPriceRate, sortObj};
