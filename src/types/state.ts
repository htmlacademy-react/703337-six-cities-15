import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { CardsType, OfferType } from './types';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    isAuthorization: boolean;
    login: string;
  };

export type OffersData = {
  offers: CardsType;
  currentOffers: CardsType;
  city: string | undefined;
  offer: OfferType | null;
  favorites: CardsType;
  isOffersDataLoading: boolean;
  error: string | null;
};

export type SelectionProcess = {
  
  
  sortType: string;
  error: string | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
