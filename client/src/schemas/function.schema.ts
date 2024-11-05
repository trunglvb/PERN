import { z } from 'zod';

export const priceSchema = z.object({
  price_min: z.string(),
  price_max: z.string(),
  price: z.number().array().min(2).max(2)
});

export type IPriceSchemaType = z.infer<typeof priceSchema>;
