import { ISecondLevelSelectOptions } from '@/types/search.type';
import { Building, Building2, LandPlot, Tractor, Warehouse, HandHeart } from 'lucide-react';

export const postTypes: ISecondLevelSelectOptions[] = [
  {
    id: 'apartment',
    label: 'Căn hộ chung cư',
    icon: Building2,
    children: [
      {
        id: 'mini-apartment',
        parentId: 'apartment',
        label: 'Chung cư mini, căn hộ dịch vụ'
      }
    ]
  },
  {
    id: 'house',
    label: 'Các loại nhà bán',
    icon: Building,
    children: [
      {
        id: 'private-house',
        parentId: 'house',
        label: 'Nhà riêng'
      },
      {
        id: 'villa',
        parentId: 'house',
        label: 'Nhà biệt thự, liền kề'
      },
      {
        id: 'street-house',
        parentId: 'house',
        label: 'Nhà mặt phố'
      },
      {
        id: 'shophouse',
        parentId: 'house',
        label: 'Shophouse, nhà phố thương mại'
      }
    ]
  },
  {
    id: 'land',
    label: 'Các loại đất bán',
    icon: LandPlot,
    children: [
      {
        id: 'project-land',
        parentId: 'land',
        label: 'Đất nền dự án'
      },
      {
        id: 'land-plot',
        parentId: 'land',
        label: 'Bán đất'
      }
    ]
  },
  {
    id: 'resort',
    label: 'Trang trại, khu nghỉ dưỡng',
    icon: Tractor,
    children: [
      {
        id: 'condotel',
        parentId: 'resort',
        label: 'Condotel'
      }
    ]
  },
  {
    id: 'warehouse',
    label: 'Kho, nhà xưởng',
    icon: Warehouse
  },
  {
    id: 'other',
    label: 'Bất động sản khác',
    icon: HandHeart
  }
];
