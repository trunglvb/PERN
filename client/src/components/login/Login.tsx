import { useState } from 'react';
import bannerLogin from '@/assets/jpg/banner-login.jpg';
import FormInput from '@/components/forms/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { loginSchema, registerSchema } from '@/utils/schema/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { z as zod } from 'zod';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const userSchema = isLoginMode ? loginSchema : registerSchema;
  type IUserSchemaType = zod.infer<typeof userSchema>;

  const form = useForm<IUserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
      confirmPassword: ''
    }
  });
  const { handleSubmit, setError, formState } = form;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const tongleVarient = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className='grid grid-cols-10'>
      <div className='col-span-4 grid place-items-center'>
        <img src={bannerLogin} alt='' className='w-full object-contain' />
      </div>
      <div className='col-span-6 p-8'>
        <div className='text-base font-bold'>Xin chào bạn</div>
        <div className='mb-5 text-2xl font-bold'>{isLoginMode ? 'Đăng nhập để tiếp tục' : 'Đăng kí tài khoản'}</div>
        <Form {...form}>
          <form onSubmit={onSubmit} className='flex flex-col gap-3'>
            <FormInput formControl={form} name='emailOrPhone' placeholder='SĐT chính hoặc email' />
            <FormInput formControl={form} name='password' placeholder='Mật khẩu' type='password' />
            {!isLoginMode && (
              <FormInput formControl={form} name='confirmPassword' placeholder='Nhập lại mật khẩu' type='password' />
            )}
            {isLoginMode ? (
              <Button type='submit' className='mt-4 w-full'>
                Đăng nhập
              </Button>
            ) : (
              <Button type='submit' className='mt-4 w-full'>
                Đăng kí
              </Button>
            )}
          </form>
        </Form>
        <div className='relative mt-6 flex max-w-full items-center'>
          <Separator className='w-auto flex-grow border-gray-300' />
          <span className='mx-2 text-sm text-gray-500 '>Hoặc</span>
          <Separator className='w-auto flex-grow border-gray-300' />
        </div>
        <div className='mt-6'></div>
        <div className='mt-4 flex items-center justify-center gap-1 text-sm'>
          <div>{isLoginMode ? 'Bạn chưa là thành viên?' : 'Bạn đã là thành viên?'}</div>
          <div>
            <span className='cursor-pointer font-bold text-red-600 hover:underline' onClick={tongleVarient}>
              {isLoginMode ? 'Đăng kí ' : 'Đăng nhập '}
            </span>
            <span>tại đây</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
