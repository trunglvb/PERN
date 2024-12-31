import { IUser } from '@/types/user.type';
import { ISuccessResponseApi } from '@/types/utils.type';
import http from '@/utils/http';

export const USER_URL = {
  GET_USER: 'user/me',
  POST_USER: 'user/me'
};

const getUser = () => http.get<ISuccessResponseApi<IUser>>(USER_URL.GET_USER);
const getUserPost = (body: { id: string }) => http.post<ISuccessResponseApi<IUser>>(USER_URL.POST_USER, body);

const userApi = { getUser, getUserPost };
export default userApi;
