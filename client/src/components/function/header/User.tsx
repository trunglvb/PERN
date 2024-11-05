import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { ChevronDown, LogOut } from 'lucide-react';
import menu from '@/constants/function/menu';
import authApi from '@/apis/auth.api';
import { useMutation } from '@tanstack/react-query';
import { clearLocalStorage } from '@/utils/utils';

const User = () => {
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
          <span className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200'>L</span>
          <span className='mr-1 text-sm font-semibold'>Trung Lê</span>
          <ChevronDown className='h-4 w-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[220px] rounded-lg shadow-lg'>
        <div className='rounded-t-md bg-main/90 p-4 text-white'>
          <h4 className='font-bold'>Gói Hội viên</h4>
          <p className='text-xs'>Tiết kiệm đến 30% chi phí so với đăng tin/đẩy tin lẻ</p>
          <button className='mt-2 rounded-md bg-white px-4 py-1 text-xs text-main'>Tìm hiểu thêm</button>
        </div>
        <DropdownMenuSeparator />
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
