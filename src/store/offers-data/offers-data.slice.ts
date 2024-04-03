import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, CITIES } from '../../const';
import { fetchOffersAction, fetchOfferAction, fetchFavoriteAction } from '../api-actions';
import { OffersData } from '../../types/state';
import { sortObj } from '../../util';
import { changeSortType } from '../offers-process/offers-process.slice';

type SearchByName = {
  payload: string;
  type: string;
};

const initialState: OffersData = {
  offers: [],
  currentOffers: [],
  city: CITIES[0],
  offer: null,
  favorites:[],
  isOffersDataLoading: false,
  error: null,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, action : SearchByName) => {
      state.city = action.payload;
    },
    filterOffers: (state) => {
      state.currentOffers = state.offers.filter((item) => item.city.name === state.city) ;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        //offersData.caseReducers.filterOffers(state);
        state.currentOffers = state.offers.filter((item) => item.city.name === state.city);

        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        console.log(action.payload);
        state.isOffersDataLoading = false;
        state.error = 'error';
      })
      .addCase(changeSortType, (state, action) => {
        state.currentOffers = sortObj(action.payload, state.currentOffers);
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        console.log(action.payload)
        state.offer = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isOffersDataLoading = false;
      });
  }
});
const {filterOffers, changeCity} = offersData.actions;
export {filterOffers, changeCity};

