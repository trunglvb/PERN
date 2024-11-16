import { AppSidebar } from '@/components/function/sidebars/appSidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { navMain } from '@/constants/function/menu';
import { INavMain } from '@/types/nav.type';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface ILayoutProps {
  children: React.ReactNode;
}

const UserLayout = (props: ILayoutProps) => {
  const { pathname } = useLocation();

  const findTitleByPathname = (pathname: string, menuItems: INavMain[]): string | null => {
    for (const item of menuItems) {
      if (item.items) {
        const childTitle = findTitleByPathname(pathname, item.items);
        if (childTitle) return childTitle;
      }
      if (item.url === pathname) {
        return item.title;
      }
    }
    return null;
  };

  const { children } = props;
  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className='flex min-h-screen flex-col'>
        <div className='flex flex-1'>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                <div className='flex items-center gap-2 px-4'>
                  <SidebarTrigger className='-ml-1' />
                  <Separator orientation='vertical' className='mr-2 h-4' />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className='md:block'>
                        <span>{findTitleByPathname(pathname, navMain)}</span>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserLayout;
