import { ChartPie, LucideProps, List, UserPen, BadgeDollarSign } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import path from '../common/path';

interface IMenu {
  id: number;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  hasSub: boolean;
  subs?: {
    id: number;
    label: string;
    path: string;
  }[];
  path: string;
}
const menu: IMenu[] = [
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
    path: path.users.managerBalance,
    subs: [
      {
        id: 33,
        label: 'Thông tin số dư',
        path: path.users.managerBalance
      },
      {
        id: 34,
        label: 'Lịch sử giao dịch',
        path: path.users.managerBalance
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

export default menu;
