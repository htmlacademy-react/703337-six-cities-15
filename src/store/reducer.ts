import { CardsType, OfferType } from '../types/types';
import { CITIES, AuthorizationStatus } from '../const';
//import { arrayOffers } from '../mocks/offers';
import { sortObj } from '../util';
import { createReducer } from '@reduxjs/toolkit';
import { citiesFill, changeCity, filterOffers,
  sortCurrentOffers, changeSortType, loadOffers, loadFavorites,
  requireAuthorization, setError, setOffersDataLoadingStatus, changeLogin, loadOffer, changeStatusFavorite, setFetchError, addComment,
  setValidateFormError } from './action';

type InitialStoreType = {
  city: string | undefined;
  offers: CardsType;
  favorites: CardsType;
  currentOffers: CardsType;
  sortType: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  login: string;
  offer: OfferType | null;
  isFetchError: boolean;
  isValidateForm: boolean;
};

const initialState : InitialStoreType = {
  city: CITIES[5],
  offers: [],
  favorites: [],
  currentOffers: [],
  sortType: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  login: '',
  offer: null,
  isFetchError: false,
  isValidateForm: false,
};

type SearchByName = {
  payload: string;
  type: string;
};

type LoadedCities = {
  payload: CardsType;
  type: string;
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action : SearchByName) => {
      state.city = action.payload;
    })
    .addCase(filterOffers, (state) => {
      state.currentOffers = state.offers.filter((item) => item.city.name === state.city) ;
    })
    .addCase(sortCurrentOffers, (state) => {
      state.currentOffers = sortObj(state.sortType, state.currentOffers) ;
    })
    .addCase(changeSortType, (state, action : SearchByName) => {
      state.sortType = action.payload;
    })
    .addCase(citiesFill, (state, action : LoadedCities) => {
      state.offers = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(changeStatusFavorite, (state, action) => {
      state.offer!.currentOffer = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.offer!.comments = [...state.offer!.comments, action.payload];
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(changeLogin, (state, action) => {
      state.login = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setFetchError, (state, action) => {
      state.isFetchError = action.payload;
    })
    .addCase(setValidateFormError, (state, action) => {
      state.isValidateForm = action.payload;
    });
});

export {reducer};
