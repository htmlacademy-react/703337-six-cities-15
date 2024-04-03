import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersProcess } from '../../types/state';


type SearchByName = {
  payload: string;
  type: string;
};

const initialState: OffersProcess = {
  sortType: '',
  error: null,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeSortType: (state, action : SearchByName) => {
      state.sortType = action.payload;
    },
  }
});

export const {changeSortType} = offersProcess.actions;
