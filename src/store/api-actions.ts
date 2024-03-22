import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { loadOffers, loadFavorites, setOffersDataLoadingStatus,
  filterOffers, requireAuthorization, setError, changeLogin, loadOffer, changeStatusFavorite } from './action';
import { saveToken, dropToken } from '../services/token';
import { AuthorizationStatus,APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData} from '../types/auth-data';
import { UserData } from '../types/user-data';
import { FavoriteStatusData } from '../types/favorite-status-data';
import { store } from '.';
import { CardsType, CardType, CommentsType, OfferType } from '../types/card';

const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<CardsType>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(filterOffers());
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (idOffer, {dispatch, extra: api}) => {
    const offer : OfferType = {
      currentOffer: null,
      nearby: [],
      comments: [],
    };
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<CardType>(`${APIRoute.Offers}/${idOffer}`);
    const nearbyOffer = (await api.get<CardsType>(`${APIRoute.Offers}/${idOffer}/nearby`)).data;
    const commentsOffer = (await api.get<CommentsType>(`${APIRoute.Comments}/${idOffer}`)).data;
    dispatch(setOffersDataLoadingStatus(false));
    console.log(nearbyOffer);
    console.log(commentsOffer);
    offer.currentOffer = data;
    offer.nearby = nearbyOffer;
    offer.comments = commentsOffer;
    dispatch(loadOffer(offer));
  },
);

export const statusFavoriteOfferAction = createAsyncThunk<void, FavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({id, favoriteStatus}, {dispatch, extra: api}) => {
    const {data} = await api.post<CardType>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`, {id, favoriteStatus});
    console.log(data);
    //const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(changeStatusFavorite(data));
  },
);

export const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<CardsType>(APIRoute.Favorites);
    console.log(data);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadFavorites(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      console.log(localStorage.getItem(AUTH_TOKEN_KEY_NAME));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      console.log(localStorage.getItem(AUTH_TOKEN_KEY_NAME));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});    
    dispatch(changeLogin(data.email));
    console.log(token);
    console.log(data);
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
