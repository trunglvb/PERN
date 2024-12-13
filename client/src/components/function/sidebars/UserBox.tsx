import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useUserStore from '@/zustand/useUserStore';
import { CircleHelp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { convertDateTimeNextYear } from '@/utils/utils';

const UserBox = () => {
  const { profile } = useUserStore();
  return (
    <div className='flex items-center gap-1'>
      <div className='relative'>
        <Avatar className='mr-2 flex h-16 w-16 items-center justify-center rounded-full'>
          <AvatarImage src={profile?.avatar} alt={profile?.fullname} />
        </Avatar>
        <div className='absolute bottom-2 right-3'>
          <img
            src={'https://res.cloudinary.com/dmyjgrs7b/image/upload/v1734063381/base_ocbbrm.svg'}
            className='h-5 w-5 rounded-full border-2 border-slate-200 bg-white object-cover p-[2px]'
          />
        </div>
      </div>
      <div className='text-sm'>
        <div className='font-semibold'>{profile?.fullname}</div>
        <div className='flex items-center gap-1'>
          <span>{profile?.score} điểm</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp className='h-4 w-4 fill-gray-300' />
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-zinc-300'>Hạng tài khoản</span>
                  <span className='text-sm font-medium'>{profile?.rPricing.name}</span>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm text-zinc-300'>Tiền tích lũy</span>
                  <span className='text-sm'>{profile?.rPricing.price} VND</span>
                </div>

                <div className='text-wrap text-sm text-zinc-300'>
                  Cần tích lũy thêm <span className='text-white'>{profile?.rPricing.requireScoreNextLevel}</span> để lên
                  hạng tiếp theo
                  <div className='flex items-center justify-between text-sm text-zinc-300'>
                    <span>Kỳ xét hạng tiếp theo</span>
                    <span>{convertDateTimeNextYear(new Date(profile?.createdAt!))}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex items-center gap-1'>
          <span>Số dư TK: </span>
          <span>{profile?.balance}</span>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
