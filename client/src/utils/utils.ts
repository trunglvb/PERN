import { IUser } from '@/types/user.type';
import { IErrorResponseApi } from '@/types/utils.type';
import axios, { AxiosError } from 'axios';
import HttpStatusCode from '@/constants/common/httpStatusCode.enum';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

//FormError la kieu tra ve cua data
export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};

export const isAxiosUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
};

export const isAxiosExpiredTokenError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return (
    isAxiosUnauthorizedError<IErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  );
};

export const LocalStorageEventTarget = new EventTarget();

export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const saveRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessTokenFromLocalStorage = () => localStorage.getItem('accessToken') ?? '';

export const getRefreshTokenFromLocalStorage = () => localStorage.getItem('refreshToken') ?? '';

export const clearLocalStorage = () => {
  const clearLSEvent = new Event('clearLS');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('profile');
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile');
  return result ? JSON.parse(result) : null;
};

export const saveProfileToLocalStorage = (user: IUser) => localStorage.setItem('profile', JSON.stringify(user));

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
