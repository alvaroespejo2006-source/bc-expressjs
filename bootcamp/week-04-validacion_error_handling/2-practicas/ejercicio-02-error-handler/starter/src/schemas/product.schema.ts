import { z } from 'zod';

// Schema base sin default en stock — así .partial() no lo fuerza a existir
const baseProductSchema = z.object({
  name: z.string({ error: 'name es obligatorio' }).min(1, 'name no puede estar vacío').trim(),
  price: z.number({ error: 'price es obligatorio' }).positive('price debe ser mayor a 0'),
  stock: z.number().int('stock debe ser entero').nonnegative('stock no puede ser negativo'),
});

export const createProductSchema = baseProductSchema.extend({
  stock: baseProductSchema.shape.stock.optional().default(0),
});

export const updateProductSchema = baseProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;