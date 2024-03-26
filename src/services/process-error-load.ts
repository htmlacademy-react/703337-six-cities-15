import { store } from '../store';
import { setFetchError } from '../store/action';
import { clearErrorLoadAction } from '../store/api-actions';

export const processErrorLoadHandle = (): void => {
  store.dispatch(setFetchError(true));
  store.dispatch(clearErrorLoadAction());
};
