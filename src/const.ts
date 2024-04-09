
export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Root = '/',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortType {
  Low = 'Price: low to high',
  High = 'Price: high to low',
  Rating = 'Top rated first',
}

export function ratingCard(scale : number) : string{
  return `${Math.round(scale) * 20}%`;
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORT = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];
export const DEFAULT_MAX_LENGTH = 100;
export const DEFAULT_MIN_LENGTH = 50;

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/{offerId}',
  Login = '/login',
  Favorites = '/favorite',
  Comments = '/comments',
  Logout = '/logout',
}

export const TIMEOUT_SHOW_ERROR = 2000;
export const CITIES_COUNT = 6;

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Offers = 'OFFERS',
}
