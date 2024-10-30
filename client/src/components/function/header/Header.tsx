import { useState } from 'react';

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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Login from '@/components/function/login';
import Logo from './Logo';
import useUserStore from '@/zustand/useUserStore';
import { useQuery } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import { Link } from 'react-router-dom';
import User from './User';

const Header = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const { isAuthenticated } = useUserStore();

  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser,
    enabled: isAuthenticated
  });

  const userInfo = user?.data?.data;

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };
  return (
    <div className='hidden md:flex md:h-24 md:items-center md:justify-between md:p-4 md:shadow'>
      <div className='flex items-center gap-4'>
        <Logo />
        {navigations.map((nav) => (
          <HoverCard key={nav.id} openDelay={300}>
            <div className='group relative mb-1 mr-4 cursor-pointer'>
              {nav.hasSub ? (
                <>
                  <HoverCardTrigger asChild>
                    <div className='relative text-sm font-semibold'>
                      {nav.name}
                      <span className='duration-450 absolute bottom-0 left-0 mr-4 h-[2px] w-0 bg-main text-sm font-semibold transition-all ease-in-out group-focus-within:w-full group-hover:w-full'></span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className='min-w-64 rounded-md bg-white p-1 shadow-lg group-hover:w-full'
                    align='start'
                  >
                    <div className='flex flex-col'>
                      {nav?.subs?.map((sub) => (
                        <Link
                          key={sub.pathname}
                          to={`${nav.pathname}/${sub.pathname}`}
                          className='cursor-pointer rounded-md px-2 py-[6px] text-sm font-medium hover:bg-accent'
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </HoverCardContent>
                </>
              ) : (
                <HoverCardTrigger asChild>
                  <div className='relative text-sm font-semibold'>
                    <Link className='text-inherit no-underline hover:no-underline focus:no-underline' to={nav.pathname}>
                      {nav.name}
                    </Link>
                    <span className='duration-450 absolute bottom-0 left-0 mr-4 h-[2px] w-0 bg-main text-sm font-semibold transition-all ease-in-out group-focus-within:w-full group-hover:w-full'></span>
                  </div>
                </HoverCardTrigger>
              )}
            </div>
          </HoverCard>
        ))}
      </div>

      <div className='flex items-center gap-3'>
        {isAuthenticated ? (
          <User />
        ) : (
          <Dialog onOpenChange={setIsShowDialog} open={isShowDialog}>
            <DialogTrigger asChild>
              <Button variant='outline' size='default' onClick={() => setIsShowDialog(true)}>
                Đăng nhập / Đăng ký
              </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[800px] p-0'>
              <DialogHeader>
                <DialogTitle />
                <DialogDescription />
              </DialogHeader>
              <Login handleCloseDialog={handleCloseDialog} />
            </DialogContent>
          </Dialog>
        )}

        <Button variant='outline' size='default' className='ml-4'>
          Đăng tin
        </Button>
      </div>
    </div>
  );
};

export default Header;
