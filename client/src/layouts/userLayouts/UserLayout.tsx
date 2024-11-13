import Header from '@/components/function/header';
import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

const UserLayout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default UserLayout;
