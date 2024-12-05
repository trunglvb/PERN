import * as React from 'react';
import { Home } from 'lucide-react';

import NavMain from './NavMain';
import NavUser from './NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import path from '@/constants/common/path';
import { Link } from 'react-router-dom';
import { navMain } from '@/constants/function/menu';
import UserBox from './UserBox';

const data = {
  navMain: navMain
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  console.log('open', open);
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
      <SidebarContent className='mt-1'>
        {open && (
          <div className='mb-2 px-2'>
            <div className='rounded-lg border bg-[#E7E5E4] p-2 '>
              <UserBox />
            </div>
          </div>
        )}
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
