import { createAction } from '@reduxjs/toolkit';
import { CardsType } from '../types/card';
import { AuthorizationStatus } from '../const';

export const citiesFill = createAction<CardsType>('fillCities');
export const changeCity = createAction<string>('changeCity');
export const sortCurrentOffers = createAction('sortCurrentOffers');
export const changeSortType = createAction<string>('changeSortType');
export const filterOffers = createAction('filterOffers');
export const loadOffers = createAction<CardsType>('loadOffers');
export const changeLogin = createAction<string>('changeLogin');
export const loadFavorites = createAction<CardsType>('loadFavorites');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
