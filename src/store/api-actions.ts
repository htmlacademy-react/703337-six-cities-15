import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { loadOffers, loadFavorites, setOffersDataLoadingStatus,
  filterOffers, requireAuthorization, setError, changeLogin, loadOffer, changeStatusFavorite, setFetchError, addComment } from './action';
import { saveToken, dropToken } from '../services/token';
import { AuthorizationStatus,APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData} from '../types/auth-data';
import { UserData } from '../types/user-data';
import { NewCommentData } from '../types/new-comment-data';
import { FavoriteStatusData } from '../types/favorite-status-data';
import { store } from '.';
import { CardsType, CardType, CommentsType, CommentType, OfferType } from '../types/types';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

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
    try {
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
      dispatch(loadOffer(offer));
    } catch(err) {
      dispatch(setFetchError(true));
    }
  },
);

export const statusFavoriteOfferAction = createAsyncThunk<void, FavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Favorite',
  async ({id, favoriteStatus}, {dispatch, extra: api}) => {
    try{
      const {data} = await api.post<CardType>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`, {id, favoriteStatus});
      dispatch(changeStatusFavorite(data));
    } catch(err){
      dispatch(setError('Не удалось добавить в избранное!'));
      dispatch(clearErrorAction());
    }
  },
);

export const fetchCommentAction = createAsyncThunk<void, NewCommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Comment',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<CommentType>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(addComment(data));
  },
);

export const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try{
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<CardsType>(APIRoute.Favorites);

      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadFavorites(data));
    } catch(err){
      dispatch(setError('Ошибка загрузки Favorites!'));
      dispatch(clearErrorAction());

    }
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
      const {data} = await api.get<UserData>(APIRoute.Login);

      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(changeLogin(data.email));
      dispatch(fetchFavoriteAction());
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

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
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(fetchFavoriteAction());
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

export const clearErrorLoadAction = createAsyncThunk(
  'clearErrorLoad',
  () => {
    setTimeout(
      () => store.dispatch(setFetchError(false)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
