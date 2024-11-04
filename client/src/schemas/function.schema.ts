import { z } from 'zod';

export const priceSchema = z.object({
  price_min: z.string(),
  price_max: z.string()
});

export type IPriceSchemaType = z.infer<typeof priceSchema>;
