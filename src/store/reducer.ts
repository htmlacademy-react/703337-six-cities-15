import { CardsType } from '../types/card';
import { CITIES } from '../const';
import { arrayOffers } from '../mocks/offers';
import { sortObj } from '../util';
import { createReducer } from '@reduxjs/toolkit';
import { citiesFill, changeCity, filterOffers,sortCurrentOffers, changeSortType } from './action';

type InitialStoreType = {
  city: string | undefined;
  offers: CardsType;
  currentOffers: CardsType;
  sortType: string;
};

const initialState : InitialStoreType = {
  city: CITIES[0],
  offers: [],
  currentOffers: arrayOffers.filter((item) => item.city.name === CITIES[0]),
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
    });
});

export {reducer};
