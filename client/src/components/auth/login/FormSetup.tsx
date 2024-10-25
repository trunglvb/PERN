import { ISetupPasswordSchemaType, setupPasswordSchema } from '@/utils/schema/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/forms/input';
import { Button } from '@/components/ui/button';
import { IAuthResponseFromGoogle, IUserResponseFromGoogle } from '@/types/auth.type';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IAddUserBody } from '@/types/user.type';

interface IFormSetupProps {
  userInfo: IUserResponseFromGoogle;
  loginGoogleMutation: UseMutationResult<AxiosResponse<IAuthResponseFromGoogle, any>, unknown, IAddUserBody, unknown>;
}

const FormSetup = (props: IFormSetupProps) => {
  const { userInfo, loginGoogleMutation } = props;
  console.log('userInfo', userInfo);
  const form = useForm<ISetupPasswordSchemaType>({
    resolver: zodResolver(setupPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
    // mode: 'onChange'
  });
  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    await loginGoogleMutation.mutateAsync({
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
