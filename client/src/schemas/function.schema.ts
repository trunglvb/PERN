import { z } from 'zod';

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
  categories: z.array(z.any())
});

export type IPriceSchemaType = z.infer<typeof priceSchema>;
export type ISizeSchemaType = z.infer<typeof sizeSchema>;
export type IPostTypesSchemaType = z.infer<typeof postTypesSchema>;
