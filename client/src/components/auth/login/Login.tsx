import { useState } from 'react';
import bannerLogin from '@/assets/jpg/banner-login.jpg';
import { useGoogleLogin } from '@react-oauth/google';
import { axiosExternalInstance } from '@/utils/external';
import HttpStatusCode from '@/constants/httpStatusCode.enum';
import { checkAlreadyUserByEmail } from '@/apis/auth.api';
import { IUserResponseFromGoogle } from '@/types/auth.type';
import FormEntry from './FormEntry';
import FormSetup from './FormSetup';

const Login = () => {
  const [isShowFormSetup, setIsShowFormSetup] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserResponseFromGoogle>();

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axiosExternalInstance(tokenResponse?.access_token);
      const data = res.data as IUserResponseFromGoogle;
      setUserInfo(data);

      if (res.status === HttpStatusCode.Ok) {
        const alreadyUser = await checkAlreadyUserByEmail(data.email);
        if (alreadyUser.data.data.hasUser) {
          //redirect to home + save accessToken
        } else {
          setIsShowFormSetup(true);
        }
      }
    },
    onError: (error) => console.log(error)
  });

  return (
    <div className='grid grid-cols-10'>
      <div className='col-span-4 grid place-items-center'>
        <img src={bannerLogin} alt='' className='w-full object-contain' />
      </div>
      <div className='col-span-6 p-8'>
        {isShowFormSetup ? <FormSetup userInfo={userInfo} /> : <FormEntry handleLoginGoogle={handleLoginGoogle} />}
      </div>
    </div>
  );
};

export default Login;
