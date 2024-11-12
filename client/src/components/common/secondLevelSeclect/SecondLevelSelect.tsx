import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ISecondLevelSelectOptions } from '@/types/search.type';
import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface ISecondLevelSelectProps {
  items: ISecondLevelSelectOptions[];
  onChange?: (value: ISecondLevelSelectOptions[]) => void;
  defaulValue?: object;
}

const SecondLevelSelect = (props: ISecondLevelSelectProps) => {
  const { onChange, items, defaulValue } = props;
  const [selectedItems, setSelectedItems] = useState<ISecondLevelSelectOptions[]>(
    (defaulValue as ISecondLevelSelectOptions[]) ?? []
  );
  const isCheckAll = items.flatMap((item) => [item, ...(item?.children || [])]).length === selectedItems?.length;

  const handleChildrenCheckedValue = (id: string) => {
    return selectedItems?.some((i) => i.id === id);
  };

  const handleParentCheckedValue = (id: string) => {
    const selectItem = items?.find((i) => i.id === id);
    const isSelectParent = selectItem?.children
      ? selectedItems?.filter((i) => i?.parentId === id)?.length === items?.find((i) => i.id === id)?.children?.length
      : handleChildrenCheckedValue(id);
    return isSelectParent;
  };

  const handleParentCheck = (item: ISecondLevelSelectOptions) => {
    if (item?.children?.length! > 0) {
      setSelectedItems((prevItems) => [...prevItems, item, ...(item?.children as ISecondLevelSelectOptions[])]);
    } else {
      handleChildrenCheck(item);
    }
  };

  const handleParentUncheck = (item: ISecondLevelSelectOptions) => {
    if (item?.children?.length! > 0) {
      setSelectedItems((prevItems) =>
        prevItems.filter((i) => i.id !== item.id && !item.children?.some((child) => child.id === i.id))
      );
    } else {
      handleChildrenUnCheck(item);
    }
  };

  const handleChildrenCheck = (item: ISecondLevelSelectOptions) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const handleChildrenUnCheck = (item: ISecondLevelSelectOptions) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  useEffect(() => {
    onChange && onChange(selectedItems);
  }, [selectedItems]);

  return (
    <>
      <div className='flex items-center justify-between rounded-sm p-2 hover:bg-accent'>
        <Label className='flex items-center gap-2' htmlFor='terms'>
          <Home className='h-4 w-4' />
          <div className='flex items-center justify-center text-sm font-medium leading-none'>Tất cả nhà đất</div>
        </Label>
        <Checkbox
          id='all'
          className='h-[14px] w-[14px]'
          checked={isCheckAll}
          onCheckedChange={(value) => {
            value ? setSelectedItems(items.flatMap((item) => [item, ...(item?.children || [])])) : setSelectedItems([]);
          }}
        />
      </div>
      <div>
        {items.map((i) => (
          <div key={i.id}>
            <div className='flex items-center justify-between rounded-sm p-2 hover:bg-accent'>
              <Label className='flex items-center gap-2' htmlFor={i.id}>
                {i.icon && <i.icon className='h-4 w-4' />}
                <div className='mt-[3px] flex items-center justify-center text-sm font-medium leading-none'>
                  {i.label}
                </div>
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
              <div className='flex items-center justify-between rounded-sm p-2 hover:bg-accent' key={el.id}>
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
