import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Building, Building2, Home, LandPlot, LucideProps } from 'lucide-react';
import { useState, ForwardRefExoticComponent, RefAttributes, useEffect } from 'react';

interface IItems {
  id: string;
  label: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  parentId?: string;
  children?: {
    id: string;
    parentId?: string;
    label: string;
  }[];
}

interface ISecondLevelSelectProps {
  items: IItems[];
  onChange?: (value: IItems[]) => void;
}

const fakeData: IItems[] = [
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
    icon: Building,
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
    icon: Building
  },
  {
    id: 'other',
    label: 'Bất động sản khác',
    icon: Building
  }
];

const SecondLevelSelect = (props: ISecondLevelSelectProps) => {
  const { onChange } = props;
  const [selectedItems, setSelectedItems] = useState<IItems[]>([]);

  const handleChildrenCheckedValue = (id: string) => {
    return selectedItems?.some((i) => i.id === id);
  };

  const handleParentCheckedValue = (id: string) => {
    const selectItem = selectedItems?.find((i) => i.id === id);
    const isSelecAllChidlren = selectItem?.children
      ? selectedItems?.filter((i) => i?.parentId === id)?.length ===
        fakeData?.find((i) => i.id === id)?.children?.length
      : handleChildrenCheckedValue(id);
    return isSelecAllChidlren;
  };

  const handleParentCheck = (item: IItems) => {
    if (item?.children?.length! > 0) {
      setSelectedItems((prevItems) => [...prevItems, item, ...(item?.children as IItems[])]);
    } else {
      handleChildrenCheck(item);
    }
    onChange && onChange(selectedItems);
  };

  const handleParentUncheck = (item: IItems) => {
    if (item?.children?.length! > 0) {
      setSelectedItems((prevItems) =>
        prevItems.filter((i) => i.id !== item.id && !item.children?.some((child) => child.id === i.id))
      );
    } else {
      handleChildrenUnCheck(item);
    }
    onChange && onChange(selectedItems);
  };

  const handleChildrenCheck = (item: IItems) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    onChange && onChange(selectedItems);
  };

  const handleChildrenUnCheck = (item: IItems) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    onChange && onChange(selectedItems);
  };

  return (
    <>
      <div className='mb-2 flex items-center justify-between'>
        <Label className='flex items-center gap-2' htmlFor='terms'>
          <Home className='h-4 w-4' />
          <div className='flex items-center justify-center text-sm font-medium leading-none'>Tất cả nhà đất</div>
        </Label>
        <Checkbox id='all' className='h-[14px] w-[14px]' />
      </div>
      <div>
        {fakeData.map((i) => (
          <div key={i.id}>
            <div className='mb-2 flex items-center justify-between'>
              <Label className='flex items-center gap-2' htmlFor={i.id}>
                {i.icon && <i.icon className='h-4 w-4' />}
                <div className='flex items-center justify-center text-sm font-medium leading-none'>{i.label}</div>
              </Label>
              <Checkbox
                id={i.id}
                className='h-[14px] w-[14px]'
                checked={handleParentCheckedValue(i.id)}
                onCheckedChange={(checked) => {
                  checked ? handleParentCheck(i) : handleParentUncheck(i);
                }}
              />
            </div>
            {i?.children?.map((el) => (
              <div className='mb-2 flex items-center justify-between' key={el.id}>
                <Label className='flex items-center gap-2' htmlFor={el.id}>
                  <div className='h-4 w-4' />
                  <div className='flex items-center justify-center text-sm font-medium leading-none'>{el.label}</div>
                </Label>
                <Checkbox
                  id={el.id}
                  className='h-[14px] w-[14px]'
                  checked={handleChildrenCheckedValue(el.id)}
                  onCheckedChange={(checked) => {
                    checked ? handleChildrenCheck(el) : handleChildrenUnCheck(el);
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SecondLevelSelect;
