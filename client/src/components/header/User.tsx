import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const User = () => {
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
          <button className='mt-2 rounded-md bg-white px-4 py-1 text-sm text-main'>Tìm hiểu thêm</button>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to='/tong-quan' className='flex cursor-pointer items-center justify-between'>
            <span>Tổng quan</span>
            <span className='rounded-md bg-red-100 px-2 text-xs text-red-500'>Mới</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/quan-ly-tin-dang' className='flex cursor-pointer items-center'>
            <span>Quản lý tin đăng</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/goi-hoi-vien' className='flex cursor-pointer items-center justify-between'>
            <span>Gói hội viên</span>
            <span className='rounded-md bg-teal-100 px-2 text-xs text-teal-600'>Tiết kiệm đến -30%</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/quan-ly-tin-tai-tro' className='flex cursor-pointer items-center'>
            <span>Quản lý tin tài trợ</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/thay-doi-thong-tin' className='flex cursor-pointer items-center'>
            <span>Thay đổi thông tin cá nhân</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/thay-doi-mat-khau' className='flex cursor-pointer items-center'>
            <span>Thay đổi mật khẩu</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/moi-gioi-chuyen-nghiep' className='flex cursor-pointer items-center justify-between'>
            <span>Môi giới chuyên nghiệp</span>
            <span className='rounded-md bg-red-100 px-2 text-xs text-red-500'>Mới</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/nap-tien' className='flex cursor-pointer items-center'>
            <span>Nạp tiền</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to='/dang-xuat' className='flex cursor-pointer items-center'>
            <span>Đăng xuất</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
