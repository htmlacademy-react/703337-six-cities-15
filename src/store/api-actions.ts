import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { AuthData} from '../types/auth-data';
import { UserData } from '../types/user-data';
import { NewCommentData } from '../types/new-comment-data';
import { FavoriteStatusData } from '../types/favorite-status-data';

import { CardsType, CardType, CommentsType, CommentType, OfferType } from '../types/types';

export const fetchOffersAction = createAsyncThunk<CardsType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<CardsType>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<OfferType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (idOffer, {extra: api}) => {
    const offer : OfferType = {
      currentOffer: null,
      nearby: [],
      comments: [],
    };

    const {data} = await api.get<CardType>(`${APIRoute.Offers}/${idOffer}`);
    const nearbyOffer = (await api.get<CardsType>(`${APIRoute.Offers}/${idOffer}/nearby`)).data;
    const commentsOffer = (await api.get<CommentsType>(`${APIRoute.Comments}/${idOffer}`)).data;

    offer.currentOffer = data;
    offer.nearby = nearbyOffer;
    offer.comments = commentsOffer;
    return offer;
  },
);

export const statusFavoriteOfferAction = createAsyncThunk<CardType, FavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Favorite',
  async ({id, favoriteStatus}, {extra: api}) => {
    const {data} = await api.post<CardType>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`, {id, favoriteStatus});
    return data;
  },
);

export const statusFavoritesActionMainPage = createAsyncThunk<CardType, FavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Favorites',
  async ({id, favoriteStatus}, {extra: api}) => {
    const {data} = await api.post<CardType>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`, {id, favoriteStatus});
    return data;
  },
);

export const fetchCommentAction = createAsyncThunk<CommentType, NewCommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Comment',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<CommentType>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<CardsType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<CardsType>(APIRoute.Favorites);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteAction());
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(fetchFavoriteAction());
    saveToken(token);
    return data;
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
    dispatch(redirectToRoute(AppRoute.Login));
    dropToken();
  },
);

