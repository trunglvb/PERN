import userApi from '@/apis/user.api';
import FormInput from '@/components/common/input';
import InputFile from '@/components/common/inputFile';
import { Form } from '@/components/ui/form';
import userSchema, { IUserSettingSchemaType } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { UploadIcon } from 'lucide-react';
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
      balance: 0,
      score: 0
    }
    // mode: 'onChange'
  });
  const { handleSubmit, watch, setValue } = form;
  const avatar = watch('avatar');

  useEffect(() => {
    if (user) {
      setValue('fullname', user.fullname);
      setValue('email', user.email);
      setValue('avatar', user.avatar);
    }
  }, [user, setValue]);

  return (
    <div className='w-full'>
      <div className='mx-auto rounded-md border p-4 md:w-[750px]'>
        <div className='text-base font-semibold'>Thông tin cá nhân</div>
        <div className='my-4 flex items-center justify-center'>
          <InputFile imageUrl={avatar} />
        </div>
        <Form {...form}>
          <form>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              <div>
                <div className='mb-2 font-semibold'>Họ và tên</div>
                <FormInput formControl={form} name='fullname' classNameInput='bg-white' />
              </div>
              <div>
                <div className='mb-2 font-semibold'>Email</div>
                <FormInput formControl={form} name='email' classNameInput='bg-white' disabled />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Personals;
