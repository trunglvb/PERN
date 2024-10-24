import { IAuthResponseFromGoogle } from '@/types/auth.type';
import { IAddUserBody } from '@/types/user.type';
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

const loginWithGoole = (body: IAddUserBody) => http.post<IAuthResponseFromGoogle>(URL_AUTH.LOGIN_GOOGLE, body);
const registerAccount = (body: { email: string; password: string }) =>
  http.post<ISuccessResponseApi<string>>(URL_AUTH.REGISTER, body);
const checkAlreadyUserByEmail = (email: string) =>
  http.get<ISuccessResponseApi<{ hasUser: boolean }>>(URL_AUTH.CHECK_ALREADY_EMAIL, {
    params: {
      email: email
    }
  });

const logoutAccount = () => http.post('/logout');

const authApi = { loginWithGoole, registerAccount, checkAlreadyUserByEmail, logoutAccount };

export default authApi;
