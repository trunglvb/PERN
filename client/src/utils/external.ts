import { URL_AUTH } from '@/apis/auth.api';
import axios from 'axios';

export const axiosExternalInstance = (access_token: string) =>
  axios({
    method: 'get',
    url: URL_AUTH.GET_USER_INFO_FROM_GOOGLE + access_token
  });
