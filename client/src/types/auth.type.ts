import { IUser } from './user.type';
import { ISuccessResponseApi } from './utils.type';

export type IAuthResponse = ISuccessResponseApi<{
  access_token: string;
  expires?: number;
  refresh_token: string;
  expires_refresh_token?: number;
  user?: IUser;
}>;

export type IUserResponseFromGoogle = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export type IAuthResponseFromGoogle = ISuccessResponseApi<{
  access_token: string;
  refresh_token: string;
  user?: IUser;
}>;
export type IRefreshTokenResponse = ISuccessResponseApi<{ access_token: string }>;
