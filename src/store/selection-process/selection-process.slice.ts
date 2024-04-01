import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SelectionProcess } from '../../types/state';

type SearchByName = {
  payload: string;
  type: string;
};

const initialState: SelectionProcess = {
  sortType: '',
  error: null,
};

export const selectionProcess = createSlice({
  name: NameSpace.Selection,
  initialState,
  reducers: {
    changeSortType: (state, action : SearchByName) => {
      state.sortType = action.payload;
    },

  }
});

export const {changeSortType} = selectionProcess.actions;
