import { useState } from 'react';
import googleIcon from '@/assets/svg/google.svg';
import facebookIcon from '@/assets/svg/facebook.svg';
import FormInput from '@/components/common/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { loginSchema, registerSchema } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { z as zod } from 'zod';
import { OverridableTokenClientConfig } from '@react-oauth/google';

interface IFormEntryProps {
  handleLoginGoogle: (overrideConfig?: OverridableTokenClientConfig) => void;
}

const FormEntry = (props: IFormEntryProps) => {
  const { handleLoginGoogle } = props;
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const userSchema = isLoginMode ? loginSchema : registerSchema;
  type IUserSchemaType = zod.infer<typeof userSchema>;

  const form = useForm<IUserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      emailOrPhone: '',
      fullname: '',
      password: '',
      confirmPassword: ''
    }
  });
  const { handleSubmit, reset } = form;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const tongleVarient = () => {
    setIsLoginMode(!isLoginMode);
    reset();
  };
  return (
    <>
      <div className='text-base font-bold'>Xin chào bạn</div>
      <div className='mb-5 text-2xl font-bold'>{isLoginMode ? 'Đăng nhập để tiếp tục' : 'Đăng kí tài khoản'}</div>
      <Form {...form}>
        <form onSubmit={onSubmit} className='flex flex-col gap-3'>
          {isLoginMode ? (
            <>
              <FormInput formControl={form} name='emailOrPhone' placeholder='SĐT chính hoặc email' />
              <FormInput formControl={form} name='password' placeholder='Mật khẩu' type='password' />
              <Button type='submit' className='mt-4 w-full'>
                Đăng nhập
              </Button>
            </>
          ) : (
            <>
              <FormInput formControl={form} name='emailOrPhone' placeholder='SĐT chính hoặc email' />
              <FormInput formControl={form} name='fullname' placeholder='Tên đầy đủ' />
              <FormInput formControl={form} name='password' placeholder='Mật khẩu' type='password' />
              <FormInput formControl={form} name='confirmPassword' placeholder='Nhập lại mật khẩu' type='password' />
              <Button type='submit' className='mt-4 w-full'>
                Đăng kí
              </Button>
            </>
          )}
        </form>
      </Form>
      <div className='relative mt-6 flex max-w-full items-center'>
        <Separator className='w-auto flex-grow border-gray-300' />
        <span className='mx-2 text-sm text-gray-500 '>Hoặc</span>
        <Separator className='w-auto flex-grow border-gray-300' />
      </div>
      <div className='mt-6 flex flex-col gap-2'>
        <Button className='flex w-full gap-2' variant='outline' onClick={() => handleLoginGoogle()}>
          <img src={googleIcon} alt='' className='h-5 w-5 object-contain' />
          <span>Đăng nhập bằng Google</span>
        </Button>
        <Button className='flex w-full gap-2' variant='outline'>
          <img src={facebookIcon} alt='' className='h-5 w-5 object-contain' />
          <span>Đăng nhập bằng Facebook</span>
        </Button>
      </div>
      <div className='mt-6 flex items-center justify-center gap-1 text-sm'>
        <div>{isLoginMode ? 'Bạn chưa là thành viên?' : 'Bạn đã là thành viên?'}</div>
        <div>
          <span
            className='cursor-pointer font-bold text-red-600 hover:underline'
            role='presentation'
            onClick={tongleVarient}
          >
            {isLoginMode ? 'Đăng kí ' : 'Đăng nhập '}
          </span>
          <span>tại đây</span>
        </div>
      </div>
    </>
  );
};

export default FormEntry;
