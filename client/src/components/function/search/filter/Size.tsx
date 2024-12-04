import RangeFilter from '@/components/common/rangeFilter';
import { useForm } from 'react-hook-form';
import { ISizeSchemaType, sizeSchema } from '@/schemas/function.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { sizes } from '@/constants/function/utils';
import useSearchStore from '@/zustand/useSearchStore';

const defaultSize = {
  min: 0,
  max: 500,
  step: 10
} as const;

const Size = () => {
  const form = useForm<ISizeSchemaType>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      size_min: '',
      size_max: '',
      size: [defaultSize.min, defaultSize.max]
    }
  });
  const { setSearchParams } = useSearchStore();

  return (
    <RangeFilter
      label='Diện tích'
      options={sizes}
      form={form}
      schema_min='size_min'
      schema_max='size_max'
      schema_range='size'
      defaultRange={defaultSize}
      onChange={(value) => {
        setSearchParams({
          sizes: value.size
        });
      }}
      unit='size'
      minValueLabel='Diện tích nhỏ nhất'
      maxValueLabel='Diện tích lớn nhất'
    />
  );
};

export default Size;
