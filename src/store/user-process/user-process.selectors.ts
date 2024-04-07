import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getAuthorizationStatus = (state : State) => state[NameSpace.User].authorizationStatus;
export const getIsAuthorization = (state : State) => state[NameSpace.User].isAuthorization;
export const getLogin = (state : State) => state[NameSpace.User].login;
export const getLoadError = (state : State) => state[NameSpace.User].isLoadLoginError;
