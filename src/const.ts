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

export function ratingCard(scale : number) : string{
  return `${scale * 20}%`;
}
