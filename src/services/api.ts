import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { getToken } from './token';
import { store } from '../store';
import { changeLogin, requireAuthorization } from '../store/action';
import { AuthorizationStatus } from '../const';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,//400
  [StatusCodes.UNAUTHORIZED]: true,//401
  [StatusCodes.NOT_FOUND]: true//404
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      console.log(token)
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => {
      console.log(response)
      store.dispatch(changeLogin(response.data.email))
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      console.log(store.getState().login)
      return response},
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        console.log(detailMessage)
        processErrorHandle(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};

