import React, { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import navigations from '@/constants/navitagion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import Login from '@/components/auth/login';
import Logo from './Logo';
import useUserStore from '@/zustand/useUserStore';
import { useQuery } from '@tanstack/react-query';
import userApi from '@/apis/user.api';

const Header = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const { isAuthenticated } = useUserStore();

  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser,
    enabled: isAuthenticated
  });

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };
  return (
    <div className='flex h-24 items-center justify-between p-4 shadow'>
      <div className='flex items-center gap-4'>
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            {navigations.map((el) => (
              <React.Fragment key={el.id}>
                {el.hasSub ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{el.name}</NavigationMenuTrigger>
                    <NavigationMenuContent className='grid min-w-96 grid-cols-2 gap-[6px] p-4'>
                      {el?.subs?.map((sub) => (
                        <NavigationMenuLink
                          key={sub.pathname}
                          className='cursor-pointer rounded p-1 text-sm font-bold hover:bg-accent'
                        >
                          {sub.name}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{el.name}</NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isAuthenticated ? (
        <div>DNTC</div>
      ) : (
        <div className='flex items-center gap-3'>
          <Dialog onOpenChange={setIsShowDialog} open={isShowDialog}>
            <DialogTrigger asChild>
              <Button
                className='border-none bg-transparent text-stone-900 hover:bg-transparent hover:underline'
                size='lg'
                onClick={() => setIsShowDialog(true)}
              >
                Đăng nhập / Đăng ký
              </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[800px] p-0' isHideClose={false}>
              <DialogHeader>
                <DialogTitle />
                <DialogDescription />
              </DialogHeader>
              <Login handleCloseDialog={handleCloseDialog} />
            </DialogContent>
          </Dialog>

          <Button variant='outline' size='lg'>
            Đăng tin
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
