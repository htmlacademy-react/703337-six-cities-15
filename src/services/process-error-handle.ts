import { store } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from '../store/offers-data/offers-data.slice';
import { TIMEOUT_SHOW_ERROR } from '../const';
//import { clearErrorAction } from '../store/api-actions';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

