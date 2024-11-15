import { ISecondLevelSelectOptions } from '@/types/search.type';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { z } from 'zod';

const ICategories = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.optional(z.custom<ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>>()),
  parentId: z.optional(z.string()),
  children: z.optional(
    z.array(
      z.object({
        id: z.string(),
        parentId: z.optional(z.string()),
        label: z.string()
      })
    )
  )
});

export const priceSchema = z.object({
  price_min: z.string(),
  price_max: z.string(),
  price: z.number().array()
});

export const sizeSchema = z.object({
  size_min: z.string(),
  size_max: z.string(),
  size: z.number().array()
});

export const postTypesSchema = z.object({
  categories: z.array(ICategories)
});

export type IPriceSchemaType = z.infer<typeof priceSchema>;
export type ISizeSchemaType = z.infer<typeof sizeSchema>;
export type IPostTypesSchemaType = z.infer<typeof postTypesSchema>;
