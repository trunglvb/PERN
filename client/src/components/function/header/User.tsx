import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { ChevronDown, LogOut } from 'lucide-react';
import { menu } from '@/constants/function/menu';
import authApi from '@/apis/auth.api';
import { useMutation } from '@tanstack/react-query';
import { clearLocalStorage } from '@/utils/utils';
import useUserStore from '@/zustand/useUserStore';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const User = () => {
  const { profile } = useUserStore();
  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      clearLocalStorage();
      // queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] });
    }
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='focus:outline-none'>
        <button className='flex items-center'>
          <Avatar className='mr-2 flex h-8 w-8 items-center justify-center rounded-full'>
            <AvatarImage src={profile?.avatar} alt={profile?.fullname} />
          </Avatar>
          <span className='mr-1 text-sm font-semibold'>{profile?.fullname}</span>
          <ChevronDown className='h-4 w-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[220px] rounded-lg shadow-lg' align='end'>
        {menu.map((item) => (
          <DropdownMenuItem asChild key={item.id}>
            <Link to={item.path} className='flex cursor-pointer items-center'>
              <item.icon className='mr-2 h-4 w-4' />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className='flex w-full cursor-pointer items-center outline' onClick={() => logoutMutation.mutate()}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Đăng xuất</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
