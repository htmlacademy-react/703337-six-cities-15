import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { CardsType } from '../../types/types';

export const cityNameState = (state : State) => state[NameSpace.Data].city;
export const offersState = (state : State) : CardsType => state[NameSpace.Data].offers;
export const currentOffersState = (state : State) => state[NameSpace.Data].currentOffers;
export const offerState = (state : State) => state[NameSpace.Data].offer;
export const favoritesState = (state : State) => state[NameSpace.Data].favorites;
export const currentCommentsState = (state : State) => state[NameSpace.Data].offer?.comments;
export const isOffersDataLoadingState = (state : State) => state[NameSpace.Data].isOffersDataLoading;
