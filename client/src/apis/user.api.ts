import { IUser } from '@/types/user.type';
import { ISuccessResponseApi } from '@/types/utils.type';
import http from '@/utils/http';

export const USER_URL = {
  GET_USER: 'user/me'
};

const getUser = () => http.get<ISuccessResponseApi<IUser>>(USER_URL.GET_USER);

const userApi = { getUser };
export default userApi;
