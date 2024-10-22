import React from 'react';
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
import path from '@/constants/path';
import { Link } from 'react-router-dom';
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

const Header = () => {
  console.log(import.meta.env.GOOGLE_AUTH_ID);
  return (
    <div className='flex h-24 items-center justify-between p-4 shadow'>
      <div className='flex items-center gap-4'>
        <Link to={path.publics.home} className='text-shadow text-5xl font-bold tracking-wider text-main'>
          BDSVN
        </Link>

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
      <div className='flex items-center gap-3'>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className='border-none bg-transparent text-stone-900 hover:bg-transparent hover:underline'
              size='lg'
            >
              Đăng nhập / Đăng ký
            </Button>
          </DialogTrigger>
          <DialogContent className='min-w-[800px] p-0'>
            <DialogHeader>
              <DialogTitle />
              <DialogDescription />
            </DialogHeader>
            <Login />
          </DialogContent>
        </Dialog>

        <Button variant='outline' size='lg'>
          Đăng tin
        </Button>
      </div>
    </div>
  );
};

export default Header;
