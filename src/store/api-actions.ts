import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { loadOffers, loadFavorites, setOffersDataLoadingStatus,
  filterOffers, requireAuthorization, setError, changeLogin, loadOffer, changeStatusFavorite, setFetchError, addComment, setAuthorization,
  addStatusFavorites, removeStatusFavorites} from './action';
import { saveToken, dropToken } from '../services/token';
import { AuthorizationStatus,APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData} from '../types/auth-data';
import { UserData } from '../types/user-data';
import { NewCommentData } from '../types/new-comment-data';
import { FavoriteStatusData } from '../types/favorite-status-data';

import { CardsType, CardType, CommentsType, CommentType, OfferType } from '../types/types';


// export const clearErrorAction = createAsyncThunk(
//   'clearError',
//   () => {
//     setTimeout(
//       () => dispatch(setError(null)),
//       TIMEOUT_SHOW_ERROR,
//     );
//   },
// );

// export const clearIsAuthorization = createAsyncThunk(
//   'clearIsAuthorization',
//   () => {
//     setTimeout(
//       () => store.dispatch(setAuthorization(false)),
//       TIMEOUT_SHOW_ERROR,
//     );
//   },
// );

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
    //try {
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
    //dispatch(loadOffer(offer));
    // } catch(err) {
    //   dispatch(setFetchError(true));
    // }
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
      //dispatch(clearErrorAction());
    }
  },
);

export const statusFavoritesAction = createAsyncThunk<void, FavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Favorites',
  async ({id, favoriteStatus}, {dispatch, extra: api}) => {
    try{
      const {data} = await api.post<CardType>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`, {id, favoriteStatus});
      dispatch(addStatusFavorites(data));
    } catch(err){
      dispatch(setError('Не удалось добавить в избранное!'));
      //dispatch(clearErrorAction());
    }
  },
);

export const statusNotFavoritesAction = createAsyncThunk<void, FavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Favorites',
  async ({id, favoriteStatus}, {dispatch, extra: api}) => {
    try{
      const {data} = await api.post<CardType>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`, {id, favoriteStatus});
      dispatch(removeStatusFavorites(data.id));
    } catch(err){
      dispatch(setError('Не удалось убрать из избранного!'));
      //dispatch(clearErrorAction());
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

export const fetchFavoriteAction = createAsyncThunk<CardsType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    // try{
    //dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<CardsType>(APIRoute.Favorites);
    return data;
    // dispatch(setOffersDataLoadingStatus(false));
    // dispatch(loadFavorites(data));
    // } catch(err){
    //   dispatch(setError('Ошибка загрузки Favorites!'));
    //   dispatch(clearErrorAction());

    //}
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    //try {
    const {data} = await api.get<UserData>(APIRoute.Login);
    
    return data;
    // dispatch(setAuthorization(true));
    // dispatch(clearIsAuthorization());
    // dispatch(requireAuthorization(AuthorizationStatus.Auth));
    // dispatch(changeLogin(data.email));
    // dispatch(fetchFavoriteAction());
    // } catch {
    //   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    // }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data, data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    return data;
    // dispatch(changeLogin(data.email));
    // dispatch(requireAuthorization(AuthorizationStatus.Auth));
    // dispatch(setAuthorization(true));
    // dispatch(fetchFavoriteAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    //dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

// export const clearErrorLoadAction = createAsyncThunk(
//   'clearErrorLoad',
//   () => {
//     setTimeout(
//       () => store.dispatch(setFetchError(false)),
//       TIMEOUT_SHOW_ERROR,
//     );
//   },
// );


