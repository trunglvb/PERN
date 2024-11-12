import RangeFilter from '@/components/common/rangeFilter';
import { useForm } from 'react-hook-form';
import { IPriceSchemaType, priceSchema } from '@/schemas/function.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { prices } from '@/constants/function/prices';

const defaultPrice = {
  min: 0,
  max: 10000,
  step: 100
} as const;

const Price = () => {
  const form = useForm<IPriceSchemaType>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price_min: '',
      price_max: '',
      price: [defaultPrice.min, defaultPrice.max]
    }
  });
  return (
    <RangeFilter
      label='Mức giá'
      options={prices}
      form={form}
      schema_min='price_min'
      schema_max='price_max'
      schema_range='price'
      defaultRange={defaultPrice}
      onChange={(value) => {
        console.log(value);
      }}
      unit='price'
      minValueLabel='Giá thấp nhất'
      maxValueLabel='Giá cao nhất'
    />
  );
};

export default Price;