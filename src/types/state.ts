import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { CardsType, OfferType } from './types';
import { UserData } from './user-data';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    isAuthorization: boolean;
    login: null | UserData;
    isLoadLoginError: boolean;
  };

export type OffersData = {
  offers: CardsType;
  currentOffers: CardsType;
  city: string | undefined;
  offer: OfferType | null;
  favorites: CardsType;
  isOffersDataLoading: boolean;
  error: string | null;
  isFetchError: boolean;
  isFetchLogout: boolean;
};

export type OffersProcess = {
  sortType: string;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
