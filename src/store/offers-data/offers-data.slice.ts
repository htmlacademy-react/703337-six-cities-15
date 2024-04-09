import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, CITIES } from '../../const';
import { fetchOffersAction, fetchOfferAction, fetchFavoriteAction, statusFavoriteOfferAction, fetchCommentAction,
  statusFavoritesActionMainPage, logoutAction} from '../api-actions';
import { OffersData } from '../../types/state';
import { sortObj, removeCard, addCard } from '../../util';
import { changeSortType } from '../offers-process/offers-process.slice';

type SearchByName = {
  payload: string;
  type: string;
};

type SearchByFlag = {
  payload: boolean;
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
  isFetchError: false,
  isFetchLogout: false,
  isOfferLoad: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, action : SearchByName) => {
      state.city = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload as string;
    },
    setIsFetchError: (state, action : SearchByFlag) => {
      state.isFetchError = action.payload;
    },
    filterOffers: (state) => {
      state.currentOffers = state.offers.filter((item) => item.city.name === state.city);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;

        state.currentOffers = state.offers.filter((item) => item.city.name === state.city);
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.isFetchError = true;
        state.error = 'Не удалось загрузить предложения!';
      })
      .addCase(changeSortType, (state, action) => {
        state.currentOffers = sortObj(action.payload, state.currentOffers);
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoad = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferLoad = false;
        state.offer = action.payload;
        state.isFetchError = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isFetchError = true;
        state.error = 'Неудалось загрузить предложение';
      })
      .addCase(logoutAction.pending, (state) => {
        state.isFetchLogout = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isFetchLogout = false;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.error = 'Не удалось загрузить Favorites!';
      })
      .addCase(statusFavoriteOfferAction.fulfilled, (state, action) => {
        state.offer!.currentOffer = action.payload;

      })
      .addCase(statusFavoritesActionMainPage.fulfilled, (state, action) => {
        state.favorites = action.payload.isFavorite
          ? addCard([...state.favorites], action.payload.id, action.payload)
          : removeCard([...state.favorites], action.payload.id);

        state.currentOffers = addCard([...state.currentOffers], action.payload.id, action.payload);
      })
      .addCase(fetchCommentAction.fulfilled, (state, action) => {
        state.offer!.comments = [...state.offer!.comments, action.payload];

      });
  }
});
export const { changeCity, setError, filterOffers, setIsFetchError} = offersData.actions;

