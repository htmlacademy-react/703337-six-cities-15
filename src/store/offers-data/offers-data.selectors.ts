import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { CardsType, CommentsType } from '../../types/types';
import { createSelector } from '@reduxjs/toolkit';
import { sortComment } from '../../util';

export const getCityNameState = (state : State) => state[NameSpace.Data].city;
export const getOffersState = (state : State) : CardsType => state[NameSpace.Data].offers;
export const getCurrentOffersState = (state : State) => state[NameSpace.Data].currentOffers;
export const getOfferState = (state : State) => state[NameSpace.Data].offer;
export const getFavoritesState = (state : State) => state[NameSpace.Data].favorites;
export const getCurrentCommentsState = (state : State) => state[NameSpace.Data].offer?.comments;
export const getOffersDataLoadingState = (state : State) => state[NameSpace.Data].isOffersDataLoading;

export const getCommentsSortState = createSelector(
  [getCurrentCommentsState], (comments) : CommentsType => [...comments as []].sort(sortComment).slice(0, 10)

);
