import { ChartPie, FolderCode, LucideProps, SlidersHorizontal, UserPen, Lock } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import path from './path';

interface IMenu {
  id: number;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  subText?: string;
  hasSub: boolean;
  subs?: {
    id: number;
    label: string;
    path: string;
  }[];
}
const menu: IMenu[] = [
  {
    id: 1,
    label: 'Tổng quan',
    icon: ChartPie,
    subText: 'Mới',
    hasSub: false
  },
  {
    id: 2,
    label: 'Quản lý tin đăng',
    icon: SlidersHorizontal,
    hasSub: true
  },
  {
    id: 3,
    label: 'Gói hội viên',
    icon: FolderCode,
    hasSub: true
  },
  {
    id: 4,
    label: 'Thông tin cá nhân',
    icon: UserPen,
    hasSub: true,
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
  },
  {
    id: 3,
    label: 'Thay đổi mật khẩu',
    icon: Lock,
    hasSub: false
  }
];

export default menu;
