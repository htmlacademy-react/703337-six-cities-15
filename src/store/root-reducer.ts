import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process.slice';
import { selectionProcess } from './selection-process/selection-process.slice';
import { offersData } from './offers-data/offers-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Selection]: selectionProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});

