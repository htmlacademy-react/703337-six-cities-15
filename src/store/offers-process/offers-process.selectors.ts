import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCurrentSortTypeState = (state : State) => state[NameSpace.Offers].sortType;

