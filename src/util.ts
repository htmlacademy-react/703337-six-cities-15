import { CardType, CardsType, CommentType } from './types/types';
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

const sortComment = (a: CommentType, b : CommentType) => {
  if(new Date(b.date) > new Date(a.date)){
    return 1;
  }

  if (new Date(b.date) < new Date(a.date)) {
    return -1;
  }

  return 0;
};

const maxLengthComment = (comment : string) => comment.length < 100;
const minLengthComment = (comment : string) => comment.length > 50;

const getUpperCaseFirstLetter = (str : string) => [...str].map((char, index) =>
  index === 0 ? char.toUpperCase() : char).join('');

export {sortByPriceHigh, sortByPriceLow, sortByPriceRate, sortObj, getUpperCaseFirstLetter, sortComment, maxLengthComment, minLengthComment};
