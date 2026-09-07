import { z } from 'zod';

const basePlantSchema = z.object({
  name: z.string({ error: 'name es obligatorio' }).min(1).trim(),
  species: z.string({ error: 'species es obligatorio' }).min(1).trim(),
  price: z.number({ error: 'price es obligatorio' }).positive('Debe ser mayor a 0'),
  stock: z.number().int().nonnegative(),
  sku: z.string({ error: 'sku es obligatorio' }).min(1).trim(),
  categoryId: z.number().int().positive().optional().nullable(),
});

export const createPlantSchema = basePlantSchema.extend({
  stock: basePlantSchema.shape.stock.optional().default(0),
});

export const updatePlantSchema = basePlantSchema.partial();

export type CreatePlantDto = z.infer<typeof createPlantSchema>;
export type UpdatePlantDto = z.infer<typeof updatePlantSchema>;