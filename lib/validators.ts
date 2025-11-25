import { z } from 'zod';

export const ProductCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(''),
  priceInt: z.number().int().min(0),
  currency: z.string().default('TWD'),
  stock: z.number().int().min(0).default(0),
  sku: z.string().optional(),
  images: z.array(z.string().url()).optional().default([]),
  categoryName: z.string().optional()
});

export type ProductCreateInput = z.infer<typeof ProductCreateSchema>;


