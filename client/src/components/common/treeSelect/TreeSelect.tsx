import React, { useState } from 'react';
import { Input } from '../../ui/input';

type TreeDataItem = {
  id: string;
  name: string;
  icon?: any;
  selectedIcon?: any;
  openIcon?: any;
  children?: TreeDataItem[];
  actions?: React.ReactNode;
  onClick?: () => void;
};

type TreeSelectProps = {
  data: TreeDataItem[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
};

const TreeSelect: React.FC<TreeSelectProps> = ({ data, selectedIds = [], onSelectionChange }) => {
  const [checkedIds, setCheckedIds] = useState<string[]>(selectedIds);

  const toggleCheck = (id: string, children: TreeDataItem[] = []) => {
    let newCheckedIds = [...checkedIds];

    const updateChildren = (items: TreeDataItem[], check: boolean) => {
      items.forEach((item) => {
        if (check && !newCheckedIds.includes(item.id)) {
          newCheckedIds.push(item.id);
        } else if (!check) {
          newCheckedIds = newCheckedIds.filter((i) => i !== item.id);
        }
        if (item.children) {
          updateChildren(item.children, check);
        }
      });
    };

    const isChecked = newCheckedIds.includes(id);
    if (isChecked) {
      newCheckedIds = newCheckedIds.filter((i) => i !== id);
      updateChildren(children, false);
    } else {
      newCheckedIds.push(id);
      updateChildren(children, true);
    }

    // Update parent nodes based on child selection
    const updateParentSelection = (item: TreeDataItem) => {
      if (item.children) {
        const allChildrenChecked = item.children.every((child) => newCheckedIds.includes(child.id));
        const someChildrenChecked = item.children.some((child) => newCheckedIds.includes(child.id));

        if (allChildrenChecked && !newCheckedIds.includes(item.id)) {
          newCheckedIds.push(item.id);
        } else if (!allChildrenChecked && someChildrenChecked) {
          newCheckedIds = newCheckedIds.filter((i) => i !== item.id);
        }

        item.children.forEach((child) => updateParentSelection(child));
      }
    };

    data.forEach((item) => updateParentSelection(item));
    setCheckedIds(newCheckedIds);
    onSelectionChange?.(newCheckedIds);
  };

  const renderTree = (items: TreeDataItem[]) => (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Input
            type='checkbox'
            checked={checkedIds.includes(item.id)}
            onChange={() => toggleCheck(item.id, item.children)}
          />
          {item.name}
          {item.children && renderTree(item.children)}
        </li>
      ))}
    </ul>
  );

  return <div>{renderTree(data)}</div>;
};

export default TreeSelect;
