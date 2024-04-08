import { CardType, CardsType, CommentType } from './types/types';
import { SortType, DEFAULT_MAX_LENGTH, DEFAULT_MIN_LENGTH, CITIES, CITIES_COUNT } from './const';

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

const removeCard = (arr : CardsType, id : string) => {
  const favorite = [...arr].filter((item) => item.id !== id);
  return favorite;
};

const addCard = (arr : CardsType, id : string, card : CardType) => {
  const index = arr.findIndex((element) => element.id === id);
  const favorite = [...arr];
  if(index >= 0){
    favorite.splice(index, 1, card);
  } else{
    favorite.push(card);
  }
  return favorite;
};

const maxLengthComment = (comment : string) => comment.length < DEFAULT_MAX_LENGTH;
const minLengthComment = (comment : string) => comment.length > DEFAULT_MIN_LENGTH;

const getUpperCaseFirstLetter = (str : string) => [...str].map((char, index) =>
  index === 0 ? char.toUpperCase() : char).join('');

const getRandomInt = (min : number, max : number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomCity = () : string => {
  const city = getRandomInt(0, CITIES_COUNT - 1);
  return CITIES[city];
};

export {sortByPriceHigh, sortByPriceLow, sortByPriceRate, sortObj, getUpperCaseFirstLetter, sortComment,
  maxLengthComment, minLengthComment, removeCard, addCard, getRandomCity, getRandomInt};
