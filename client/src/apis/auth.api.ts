import { ISuccessResponseApi } from '@/types/utils.type';
import http from 'src/utils/http';

export const URL_AUTH = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOG_OUT: 'logout',
  REFRESH_TOKEN: 'refresh-access-token',
  LOGIN_GOOGLE: 'http://googleapis.com/oauth2/v1/userinfo?access_token='
};

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<ISuccessResponseApi<string>>('/register', body);

export const logoutAccount = () => http.post('/logout');
