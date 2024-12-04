import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useUserStore from '@/zustand/useUserStore';

const UserBox = () => {
  const { profile } = useUserStore();
  return (
    <div className='relative'>
      <div className=''>
        <Avatar className='mr-2 flex h-16 w-16 items-center justify-center rounded-full'>
          <AvatarImage src={profile?.avatar} alt={profile?.fullname} />
        </Avatar>
      </div>
    </div>
  );
};

export default UserBox;
