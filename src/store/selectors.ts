import { sortComment } from '../util';
import { State } from '../types/state';
import { CommentsType } from '../types/types';
import { createSelector } from '@reduxjs/toolkit';

export const cityNameState = (state : State) => state.city;
export const offersState = (state : State) => state.offers;
export const offerState = (state : State) => state.offer;
export const currentOffersState = (state : State) => state.currentOffers;
export const currentSortTypeState = (state : State) => state.sortType;
export const favoritesState = (state : State) => state.favorites;
export const authorizationStatusState = (state : State) => state.authorizationStatus;
export const currentCommentsState = (state : State) => state.offer?.comments;

export const commentsSortState = createSelector(
  [currentCommentsState], (comments) : CommentsType => [...comments as []].sort(sortComment).slice(0, 10)

);

