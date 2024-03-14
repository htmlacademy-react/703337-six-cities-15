import { createAction } from '@reduxjs/toolkit';
import { CardsType } from '../types/card';

export const citiesFill = createAction<CardsType>('fillCities');
export const changeCity = createAction<string>('changeCity');
export const changeCurrentOffers = createAction<CardsType>('changeCurrentOffers');
export const changeSortType = createAction<string>('changeSortType');
