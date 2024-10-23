import { IAuthResponseFromGoogle } from '@/types/auth.type';
import { ISuccessResponseApi } from '@/types/utils.type';
import http from '@/utils/http';
export const URL_AUTH = {
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  LOG_OUT: 'auth/logout',
  REFRESH_TOKEN: 'auth/refresh-access-token',
  CHECK_ALREADY_EMAIL: 'auth/has-user',
  LOGIN_GOOGLE: 'auth/google-login',
  GET_USER_INFO_FROM_GOOGLE: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='
};

export const loginWithGoole = (body: { email: string; fullname: string; avatar: string; password: string }) =>
  http.post<IAuthResponseFromGoogle>(URL_AUTH.LOGIN_GOOGLE, body);
export const registerAccount = (body: { email: string; password: string }) =>
  http.post<ISuccessResponseApi<string>>(URL_AUTH.REGISTER, body);

export const checkAlreadyUserByEmail = (email: string) =>
  http.get<ISuccessResponseApi<{ hasUser: boolean }>>(URL_AUTH.CHECK_ALREADY_EMAIL, {
    params: {
      email: email
    }
  });

export const logoutAccount = () => http.post('/logout');
