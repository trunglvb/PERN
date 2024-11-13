import path from '@/constants/common/path';
import PublicsLayout from '@/layouts/publicsLayout';
import UserLayout from '@/layouts/userLayouts';
import LoginPage from '@/pages/publish/auth';
import Home from '@/pages/publish/home';
import News from '@/pages/publish/news';
import RentProperty from '@/pages/publish/rentProperty';
import SoldProperty from '@/pages/publish/soldProperty';
import Deposit from '@/pages/users/finances/deposit';
import ManagerBalance from '@/pages/users/finances/managerBalance';
import PaymentHistory from '@/pages/users/finances/paymentHistory';
import Generals from '@/pages/users/generals';
import Personals from '@/pages/users/personals';
import CreatePost from '@/pages/users/posts/create';
import DraftPost from '@/pages/users/posts/draft';
import GeneralPost from '@/pages/users/posts/general';
import useUserStore from '@/zustand/useUserStore';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? <Outlet /> : <Navigate to={path.auth.login} />;
};
const RejectedRoute = () => {
  const { isAuthenticated } = useUserStore();
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.publics.home} />;
};
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
    },

    //user
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        //generals
        {
          path: path.users.general,
          element: (
            <UserLayout>
              <Generals />
            </UserLayout>
          )
        },

        //posts
        {
          path: path.users.createPost,
          element: (
            <UserLayout>
              <CreatePost />
            </UserLayout>
          )
        },
        {
          path: path.users.managerPost,
          element: (
            <UserLayout>
              <GeneralPost />
            </UserLayout>
          )
        },
        {
          path: path.users.draftPost,
          element: (
            <UserLayout>
              <DraftPost />
            </UserLayout>
          )
        },

        //personal
        {
          path: path.users.updateAccount,
          element: (
            <UserLayout>
              <Personals />
            </UserLayout>
          )
        },

        //finance
        {
          path: path.users.managerFinance,
          element: (
            <UserLayout>
              <ManagerBalance />
            </UserLayout>
          )
        },
        {
          path: path.users.deposit,
          element: (
            <UserLayout>
              <Deposit />
            </UserLayout>
          )
        },
        {
          path: path.users.paymentHistory,
          element: (
            <UserLayout>
              <PaymentHistory />
            </UserLayout>
          )
        }
      ]
    },

    //reject
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.auth.login,
          element: (
            <PublicsLayout>
              <LoginPage />
            </PublicsLayout>
          )
        }
      ]
    }
  ]);

  return routeElement;
};

export default useRouteElement;
