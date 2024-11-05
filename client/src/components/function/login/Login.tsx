import { useState } from 'react';
import bannerLogin from '@/assets/jpg/banner-login.jpg';
import { useGoogleLogin } from '@react-oauth/google';
import { axiosExternalInstance } from '@/utils/external';
import HttpStatusCode from '@/constants/common/httpStatusCode.enum';
import { IUserResponseFromGoogle } from '@/types/auth.type';
import FormEntry from './FormEntry';
import FormSetup from './FormSetup';
import { useMutation } from '@tanstack/react-query';
import { saveProfileToLocalStorage } from '@/utils/utils';
import useUserStore from '@/zustand/useUserStore';
import { toast } from 'sonner';
import { IAddUserBody } from '@/types/user.type';
import authApi from '@/apis/auth.api';

interface ILoginProps {
  handleCloseDialog: () => void;
}
const Login = (props: ILoginProps) => {
  const { handleCloseDialog } = props;
  const { setIsAuthenticated } = useUserStore();
  const [isShowFormSetup, setIsShowFormSetup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserResponseFromGoogle>();

  const loginGoogleMutation = useMutation({
    mutationFn: (body: IAddUserBody) => authApi.loginWithGoole(body),
    onSuccess: (response) => {
      const { user } = response.data.data;
      saveProfileToLocalStorage(user!);
      toast.success(response.data.message);
      handleCloseDialog();
      setIsAuthenticated(true);
    }
  });

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axiosExternalInstance(tokenResponse?.access_token);
      const data = res.data as IUserResponseFromGoogle;
      setUserInfo(data);

      if (res.status === HttpStatusCode.Ok) {
        const alreadyUser = await authApi.checkAlreadyUserByEmail(data.email);
        if (alreadyUser.data.data.hasUser) {
          await loginGoogleMutation.mutateAsync({
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
          <FormSetup userInfo={userInfo!} loginGoogleMutation={loginGoogleMutation} />
        ) : (
          <FormEntry handleLoginGoogle={handleLoginGoogle} />
        )}
      </div>
    </div>
  );
};

export default Login;
