import { ChartPie, List, UserPen, BadgeDollarSign } from 'lucide-react';
import path from '../common/path';
import { IMenu } from '@/types/nav.type';

export const menu: IMenu[] = [
  {
    id: 1,
    label: 'Tổng quan',
    icon: ChartPie,
    hasSub: false,
    path: path.users.general
  },
  {
    id: 2,
    label: 'Quản lý tin đăng',
    icon: List,
    hasSub: true,
    path: path.users.managerPost,
    subs: [
      {
        id: 21,
        label: 'Đăng mới',
        path: path.users.createPost
      },
      {
        id: 22,
        label: 'Danh sách tin',
        path: path.users.managerPost
      },
      {
        id: 23,
        label: 'Tin nháp',
        path: path.users.draftPost
      }
    ]
  },
  {
    id: 3,
    label: 'Quản lý tài chính',
    icon: BadgeDollarSign,
    hasSub: true,
    path: path.users.managerFinance,
    subs: [
      {
        id: 33,
        label: 'Thông tin số dư',
        path: path.users.managerFinance
      },
      {
        id: 34,
        label: 'Lịch sử giao dịch',
        path: path.users.paymentHistory
      },
      {
        id: 34,
        label: 'Nạp tiền',
        path: path.users.deposit
      }
    ]
  },
  {
    id: 4,
    label: 'Thông tin cá nhân',
    icon: UserPen,
    hasSub: true,
    path: path.users.updateAccount,
    subs: [
      {
        id: 41,
        label: 'Chỉnh sửa thông tin cá nhân',
        path: path.users.updateAccount
      },
      {
        id: 42,
        label: 'Cài đặt tài khoản',
        path: path.users.updateAccount
      }
    ]
  }
];

export const navMain = [
  {
    title: 'Tổng quan',
    icon: ChartPie,
    url: path.users.general
  },
  {
    title: 'Quản lý tin đăng',
    url: path.users.managerPost,
    icon: List,
    items: [
      {
        title: 'Đăng mới',
        url: path.users.createPost
      },
      {
        title: 'Danh sách tin',
        url: path.users.managerPost
      },
      {
        title: 'Tin nháp',
        url: path.users.draftPost
      }
    ]
  },
  {
    title: 'Quản lý tài chính',
    url: path.users.managerFinance,
    icon: BadgeDollarSign,
    items: [
      {
        title: 'Thông tin số dư',
        url: path.users.managerFinance
      },
      {
        title: 'Lịch sử giao dịch',
        url: path.users.paymentHistory
      },
      {
        title: 'Nạp tiền',
        url: path.users.deposit
      }
    ]
  },
  {
    title: 'Thông tin cá nhân',
    url: path.users.updateAccount,
    icon: UserPen,
    items: [
      {
        title: 'Chỉnh sửa thông tin cá nhân',
        url: path.users.updateAccount
      },
      {
        title: 'Cài đặt tài khoản',
        url: path.users.settingAccount
      }
    ]
  }
];
