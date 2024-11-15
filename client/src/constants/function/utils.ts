import { ISecondLevelSelectOptions } from '@/types/search.type';
import { Building, Building2, LandPlot, Tractor, Warehouse, HandHeart } from 'lucide-react';
import banner1 from '../../../src/assets/carousel/banner1.avif';
import banner2 from '../../../src/assets/carousel/banner2.avif';
import banner3 from '../../../src/assets/carousel/banner3.avif';
import banner4 from '../../../src/assets/carousel/banner4.avif';

export const carousels = [banner4, banner2, banner3, banner1];

export const provincesSlider = [
  {
    name: 'Huế',
    image:
      'https://plus.unsplash.com/premium_photo-1690960644375-6f2399a08ebc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Đà Nẵng',
    image:
      'https://images.unsplash.com/photo-1603852452378-a4e8d84324a2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Hà Nội',
    image:
      'https://plus.unsplash.com/premium_photo-1691960159290-6f4ace6e6c4c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Hồ Chí Minh',
    image:
      'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?q=80&w=1846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Hải Phòng',
    image:
      'https://images.unsplash.com/photo-1577185475540-1d82e9a329d0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Nha Trang',
    image:
      'https://images.unsplash.com/photo-1687025846238-89362631a3e2?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

interface PriceRange {
  id: number;
  label: string;
  value: string;
}

interface SizeRange {
  id: number;
  label: string;
  value: string;
}

export const prices: PriceRange[] = [
  {
    id: -1,
    label: 'Tất cả mức giá',
    value: 'ALL'
  },
  {
    id: 1,
    label: 'Dưới 500 triệu',
    value: JSON.stringify([0, 0.5 * Math.pow(10, 3)])
  },
  {
    id: 2,
    label: '500 - 800 triệu',
    value: JSON.stringify([0.5 * Math.pow(10, 3), 0.8 * Math.pow(10, 3)])
  },
  {
    id: 3,
    label: '800 - 1 tỷ',
    value: JSON.stringify([0.8 * Math.pow(10, 3), 1 * Math.pow(10, 3)])
  },
  {
    id: 4,
    label: '1 - 2 tỷ',
    value: JSON.stringify([1 * Math.pow(10, 3), 2 * Math.pow(10, 3)])
  },
  {
    id: 5,
    label: '2 - 3 tỷ',
    value: JSON.stringify([2 * Math.pow(10, 3), 3 * Math.pow(10, 3)])
  },
  {
    id: 6,
    label: '3 - 5 tỷ',
    value: JSON.stringify([3 * Math.pow(10, 3), 5 * Math.pow(10, 3)])
  },
  {
    id: 7,
    label: '5 - 7 tỷ',
    value: JSON.stringify([5 * Math.pow(10, 3), 7 * Math.pow(10, 3)])
  },
  {
    id: 8,
    label: '7 - 10 tỷ',
    value: JSON.stringify([7 * Math.pow(10, 3), 10 * Math.pow(10, 3)])
  },
  {
    id: 50,
    label: 'Trên 10 tỷ',
    value: JSON.stringify([10 * Math.pow(10, 3), 10 * Math.pow(10, 3)])
  }
];

export const sizes: SizeRange[] = [
  {
    id: -1,
    label: 'Tất cả diện tích',
    value: 'ALL'
  },
  {
    id: 1,
    label: 'Dưới 30 m²',
    value: JSON.stringify([0, 30])
  },
  {
    id: 2,
    label: '30 - 50 m²',
    value: JSON.stringify([30, 50])
  },
  {
    id: 3,
    label: '50 - 80 m²',
    value: JSON.stringify([50, 80])
  },
  {
    id: 4,
    label: '80 - 100 m²',
    value: JSON.stringify([80, 100])
  },
  {
    id: 5,
    label: '100 - 150 m²',
    value: JSON.stringify([100, 150])
  },
  {
    id: 6,
    label: '150 - 200 m²',
    value: JSON.stringify([150, 200])
  },
  {
    id: 7,
    label: '200 - 250 m²',
    value: JSON.stringify([200, 250])
  },
  {
    id: 8,
    label: '250 - 300 m²',
    value: JSON.stringify([250, 300])
  },
  {
    id: 9,
    label: 'Trên 500 m²',
    value: JSON.stringify([500, 500])
  }
];

export const rangePriceForFilter = {
  min: 0,
  max: 1000
};

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
