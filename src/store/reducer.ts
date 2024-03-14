import { CardsType } from '../types/card';
import { createReducer } from '@reduxjs/toolkit';
import { citiesFill, changeCity, changeCurrentOffers, changeSortType } from './action';

type InitialStoreType = {
  city: string | undefined;
  offers: CardsType;
  currentOffers: CardsType;
  sortType: string;
};

const initialState : InitialStoreType = {
  city: 'Paris',
  offers: [],
  currentOffers: [],
  sortType: '',
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
    .addCase(changeCurrentOffers, (state, action : LoadedCities) => {
      state.currentOffers = action.payload;
    })
    .addCase(changeSortType, (state, action : SearchByName) => {
      state.sortType = action.payload;
    })
    .addCase(citiesFill, (state, action : LoadedCities) => {
      state.offers = action.payload;
    });
});

export {reducer};
