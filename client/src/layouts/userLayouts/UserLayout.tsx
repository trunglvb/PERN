import Header from '@/components/function/header';
import React from 'react';
import UserSideBar from './Sidebar';

interface ILayoutProps {
  children: React.ReactNode;
}

const UserLayout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <React.Fragment>
      {/* <Header /> */}
      <UserSideBar />
      {/* {children} */}
    </React.Fragment>
  );
};

export default UserLayout;
