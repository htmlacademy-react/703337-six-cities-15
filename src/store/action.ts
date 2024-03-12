import { createAction } from '@reduxjs/toolkit';
import { CardsType } from '../types/card';

export const citiesFill = createAction<CardsType>('fillCities');
export const changeCity = createAction<string>('changeCity');
