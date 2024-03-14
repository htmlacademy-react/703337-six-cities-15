import { CardType } from './types/card';

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

export {sortByPriceHigh, sortByPriceLow, sortByPriceRate};
