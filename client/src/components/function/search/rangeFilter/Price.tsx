import React from 'react';
import RangeFilter from './RangeFilter';
import { useForm } from 'react-hook-form';
import { IPriceSchemaType, priceSchema } from '@/schemas/function.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { prices } from '@/constants/function/prices';

const defaultPrice = {
  price_min: 0,
  price_max: 10000,
  step: 1
} as const;

const Price = () => {
  const form = useForm<IPriceSchemaType>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price_min: '',
      price_max: '',
      price: [defaultPrice.price_min, defaultPrice.price_max]
    }
  });
  return <RangeFilter label='Mức giá' options={prices} form={form} />;
};

export default Price;
