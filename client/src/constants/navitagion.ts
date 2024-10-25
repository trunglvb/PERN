import slugify from 'slugify';
import path from './path';

interface IPostType {
  name: string;
  pathname: string;
}
interface INavigations {
  id: number;
  name: string;
  pathname: string;
  hasSub: boolean;
  subs?: IPostType[];
}

const postSoldTypes = [
  'Căn hộ chung cư',
  'Nhà mặt phố',
  'Nhà riêng',
  'Nhà phố thương mại',
  'Biệt thự',
  'Đất nền',
  'Bán đất',
  'Trang trại',
  'Khu nghỉ dưỡng',
  'Kho',
  'Nhà xưởng',
  'Khác'
].map((el) => ({ name: el, pathname: slugify(el.toLocaleLowerCase()) }));

const postRentTypes = [
  'Căn hộ chung cư',
  'Nhà mặt phố',
  'Nhà riêng',
  'Nhà phố thương mại',
  'Biệt thự',
  'Bán đất',
  'Trang trại',
  'Khu nghỉ dưỡng',
  'Kho',
  'Nhà xưởng',
  'Khác'
].map((el) => ({ name: el, pathname: slugify(el.toLocaleLowerCase()) }));

const navigations: INavigations[] = [
  {
    id: 1,
    name: 'Nhà đất bán',
    pathname: path.publics.soldProperty,
    hasSub: true,
    subs: postSoldTypes
  },
  {
    id: 2,
    name: 'Nhà cho thuê',
    pathname: path.publics.rentProperty,
    hasSub: true,
    subs: postRentTypes
  },
  {
    id: 3,
    name: 'Tin tức',
    pathname: path.publics.news,
    hasSub: false
  }
];

export default navigations;
