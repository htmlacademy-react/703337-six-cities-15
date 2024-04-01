import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const currentSortTypeState = (state : State) => state[NameSpace.Selection].sortType;

