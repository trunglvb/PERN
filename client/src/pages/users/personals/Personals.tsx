import userApi from '@/apis/user.api';
import DivButton from '@/components/common/divButton';
import FormInput from '@/components/common/input';
import InputFile from '@/components/common/inputFile';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import userSchema, { IUserSettingSchemaType } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Personals = () => {
  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser
  });

  // post example
  // const { data: userData } = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: () => userApi.getUserPost({ id: profile?.id.toString()! })
  // });

  const user = userData?.data?.data;
  const form = useForm<IUserSettingSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      avatar: '',
      balance: 0,
      score: 0
    }
  });
  const { handleSubmit, watch, setValue } = form;
  const avatar = watch('avatar');

  useEffect(() => {
    if (user) {
      setValue('fullname', user.fullname);
      setValue('email', user.email);
      setValue('avatar', user.avatar);
      setValue('phone', user.phone || '');
      setValue('score', Number(user.score));
      setValue('balance', Number(user.balance));
    }
  }, [user, setValue]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className='w-full'>
      <div className='mx-auto rounded-md border pb-0 md:w-[750px]'>
        <div className='p-4'>
          <div className='text-base font-semibold'>Thông tin cá nhân</div>
          <div className='my-4 flex items-center justify-center'>
            <InputFile imageUrl={avatar} />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className='mb-10 p-4'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6'>
                <div>
                  <div className='mb-1 font-semibold'>Họ và tên</div>
                  <FormInput formControl={form} name='fullname' classNameInput='bg-white' />
                </div>
                <div>
                  <div className='mb-1 font-semibold'>Email</div>
                  <FormInput formControl={form} name='email' classNameInput='bg-white' disabled />
                </div>
                <div>
                  <div className='mb-1 font-semibold'>Điểm tích lũy</div>
                  <FormInput formControl={form} name='score' classNameInput='bg-white' disabled />
                </div>
                <div>
                  <div className='mb-1 font-semibold'>Số dư tài khoản</div>
                  <FormInput formControl={form} name='score' classNameInput='bg-white' disabled />
                </div>
              </div>
              <div className='mb-2 mt-8 font-semibold md:mt-6'>Số điện thoại</div>
              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6'>
                <FormInput formControl={form} name='phone' classNameInput='bg-white' disabled />
                <DivButton className='flex w-[50%] items-center gap-2 rounded-md p-2 text-main hover:bg-accent'>
                  <Plus className='h-4 w-4' />
                  <div>Thêm số điện thoại</div>
                </DivButton>
              </div>
            </div>
            <div className='sticky bottom-0 border-t bg-stone-50 p-4 shadow-lg'>
              <div className='flex justify-end'>
                <Button type='submit' className='w-52'>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Personals;
