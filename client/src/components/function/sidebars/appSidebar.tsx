import * as React from 'react';
import {
  AudioWaveform,
  BadgeDollarSign,
  BookOpen,
  Bot,
  ChartPie,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  List,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UserPen
} from 'lucide-react';

import NavMain from './navMain';
import NavUser from './navUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail
} from '@/components/ui/sidebar';
import path from '@/constants/common/path';
import { Link } from 'react-router-dom';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Tổng quan',
      icon: ChartPie,
      url: path.users.general
    },
    {
      title: 'Quản lý tin đăng',
      url: path.users.managerPost,
      icon: List,
      items: [
        {
          title: 'Đăng mới',
          url: path.users.createPost
        },
        {
          title: 'Danh sách tin',
          url: path.users.managerPost
        },
        {
          title: 'Tin nháp',
          url: path.users.draftPost
        }
      ]
    },
    {
      title: 'Quản lý tài chính',
      url: path.users.managerFinance,
      icon: BadgeDollarSign,
      items: [
        {
          title: 'Thông tin số dư',
          url: path.users.managerFinance
        },
        {
          title: 'Lịch sử giao dịch',
          url: path.users.paymentHistory
        },
        {
          title: 'Nạp tiền',
          url: path.users.deposit
        }
      ]
    },
    {
      title: 'Thông tin cá nhân',
      url: path.users.updateAccount,
      icon: UserPen,
      items: [
        {
          title: 'Chỉnh sửa thông tin cá nhân',
          url: path.users.updateAccount
        },
        {
          title: 'Cài đặt tài khoản',
          url: path.users.updateAccount
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <Link to={path.publics.home}>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
              <Home className='size-4' />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>Trang chủ</span>
              <span className='truncate text-xs'>batdongsan.com</span>
            </div>
            {/* <ChevronsUpDown className='ml-auto' /> */}
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
