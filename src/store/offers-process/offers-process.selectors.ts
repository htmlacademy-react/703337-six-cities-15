import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCurrentSortTypeState = (state : Pick<State, NameSpace.Offers>) : string => state[NameSpace.Offers].sortType;

