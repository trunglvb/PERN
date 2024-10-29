import Header from '@/components/function/header';
import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

const PublicsLayout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default PublicsLayout;
