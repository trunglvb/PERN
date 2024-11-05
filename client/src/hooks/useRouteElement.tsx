import path from '@/constants/common/path';
import PublicsLayout from '@/layouts/publicsLayout';
import Home from '@/pages/publish/home';
import News from '@/pages/publish/news';
import RentProperty from '@/pages/publish/rentProperty';
import SoldProperty from '@/pages/publish/soldProperty';
import { useRoutes } from 'react-router-dom';

const useRouteElement = () => {
  const { publics } = path;
  const routeElement = useRoutes([
    //publish
    {
      index: true,
      path: publics.home,
      element: (
        <PublicsLayout>
          <Home />
        </PublicsLayout>
      )
    },
    {
      path: publics.news,
      element: (
        <PublicsLayout>
          <News />
        </PublicsLayout>
      )
    },
    {
      path: publics.rentProperty,
      element: (
        <PublicsLayout>
          <RentProperty />
        </PublicsLayout>
      )
    },
    {
      path: publics.soldProperty,
      element: (
        <PublicsLayout>
          <SoldProperty />
        </PublicsLayout>
      )
    }
  ]);
  return routeElement;
};

export default useRouteElement;
