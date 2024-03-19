import { State } from '../types/state';

export const cityNameState = (state : State) => state.city;
export const offersState = (state : State) => state.offers;
export const currentOffersState = (state : State) => state.currentOffers;
export const currentSortTypeState = (state : State) => state.sortType;
