import { useState } from 'react';
import bannerLogin from '@/assets/jpg/banner-login.jpg';
import { useGoogleLogin } from '@react-oauth/google';
import { axiosExternalInstance } from '@/utils/external';
import HttpStatusCode from '@/constants/httpStatusCode.enum';
import { checkAlreadyUserByEmail, loginWithGoole } from '@/apis/auth.api';
import { IUserResponseFromGoogle } from '@/types/auth.type';
import FormEntry from './FormEntry';
import FormSetup from './FormSetup';
import { IUser } from '@/types/user.type';
import {
  saveAccessTokenToLocalStorage,
  saveProfileToLocalStorage,
  saveRefreshTokenToLocalStorage
} from '@/utils/utils';
import useUserStore from '@/zustand/useUserStore';
import { toast } from 'sonner';

interface ILoginProps {
  handleCloseDialog: () => void;
}
const Login = (props: ILoginProps) => {
  const { handleCloseDialog } = props;
  const { setIsAuthenticated } = useUserStore();
  const [isShowFormSetup, setIsShowFormSetup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserResponseFromGoogle>();

  const handleGoolgeLoginAfterCheckEmail = async (payload: {
    email: string;
    avatar: string;
    fullname: string;
    password: string;
  }) => {
    const { email, avatar, fullname, password } = payload;
    const response = await loginWithGoole({
      email: email,
      avatar: avatar,
      fullname: fullname,
      password: password || ''
    });
    if (response.data.data.user) {
      const { user, access_token, refresh_token } = response.data.data;
      saveAccessTokenToLocalStorage(access_token);
      saveRefreshTokenToLocalStorage(refresh_token);
      saveProfileToLocalStorage(user);
      setIsAuthenticated(true);
      toast.success(response.data.message);
      handleCloseDialog();
    }
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axiosExternalInstance(tokenResponse?.access_token);
      const data = res.data as IUserResponseFromGoogle;
      setUserInfo(data);

      if (res.status === HttpStatusCode.Ok) {
        const alreadyUser = await checkAlreadyUserByEmail(data.email);
        if (alreadyUser.data.data.hasUser) {
          await handleGoolgeLoginAfterCheckEmail({
            email: data.email,
            avatar: data.picture,
            fullname: data.name,
            password: ''
          });
        } else {
          setIsShowFormSetup(true);
        }
      }
    },
    onError: (_error) => toast.error('Đăng nhập không thành công')
  });

  return (
    <div className='grid grid-cols-10'>
      <div className='col-span-4 grid place-items-center'>
        <img src={bannerLogin} alt='' className='w-full object-contain' />
      </div>
      <div className='col-span-6 p-8'>
        {isShowFormSetup ? (
          <FormSetup userInfo={userInfo!} handleGoolgeLoginAfterCheckEmail={handleGoolgeLoginAfterCheckEmail} />
        ) : (
          <FormEntry handleLoginGoogle={handleLoginGoogle} />
        )}
      </div>
    </div>
  );
};

export default Login;
