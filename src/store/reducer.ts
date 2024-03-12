import { CardsType } from '../types/card';
import { createReducer } from '@reduxjs/toolkit';
import { citiesFill, changeCity } from './action';

type InitialStoreType = {
  city: string | undefined;
  offers: CardsType;
};

const initialState : InitialStoreType = {
  city: 'Paris',
  offers: [],
};

type SearchByName = {
  payload: string | undefined;
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
    .addCase(citiesFill, (state, action : LoadedCities) => {
      state.offers = action.payload;
    });
});

export {reducer};
