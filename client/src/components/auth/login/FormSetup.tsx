import { ISetupPasswordSchemaType, setupPasswordSchema } from '@/utils/schema/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/forms/input';
import { Button } from '@/components/ui/button';
import { IUserResponseFromGoogle } from '@/types/auth.type';
import { loginWithGoole } from '@/apis/auth.api';
import {
  saveAccessTokenToLocalStorage,
  saveProfileToLocalStorage,
  saveRefreshTokenToLocalStorage
} from '@/utils/utils';
import useUserStore from '@/zustand/useUserStore';
import { toast } from 'sonner';

interface IFormSetupProps {
  userInfo: IUserResponseFromGoogle;
  handleGoolgeLoginAfterCheckEmail: (payload: {
    email: string;
    avatar: string;
    fullname: string;
    password: string;
  }) => Promise<void>;
}

const FormSetup = (props: IFormSetupProps) => {
  const { userInfo, handleGoolgeLoginAfterCheckEmail } = props;
  const { setIsAuthenticated } = useUserStore();
  const form = useForm<ISetupPasswordSchemaType>({
    resolver: zodResolver(setupPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
    // mode: 'onChange'
  });
  const { handleSubmit, setError } = form;

  const onSubmit = handleSubmit(async (data) => {
    await handleGoolgeLoginAfterCheckEmail({
      email: userInfo.email,
      avatar: userInfo.picture,
      fullname: userInfo.name,
      password: data.password
    });
  });

  return (
    <>
      <div className='text-base font-bold'>Bước tiếp theo</div>
      <div className='mb-5 text-2xl font-bold'>Thiết lập mật khẩu</div>
      <Form {...form}>
        <form onSubmit={onSubmit} className='flex flex-col gap-3'>
          <FormInput formControl={form} name='password' placeholder='Mật khẩu' type='password' />
          <FormInput formControl={form} name='confirmPassword' placeholder='Nhập lại mật khẩu' type='password' />
          <Button type='submit' className='mt-4 w-full'>
            Xác nhận
          </Button>
        </form>
      </Form>
    </>
  );
};

export default FormSetup;
