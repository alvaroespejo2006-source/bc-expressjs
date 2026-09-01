// ============================================
// SCHEMAS — Vivero de plantas
// ============================================
import { z } from 'zod';

// Schema base sin defaults — así .partial() no fuerza campos a existir
const basePlantSchema = z.object({
  name: z.string({ error: 'name es obligatorio' }).min(1, 'name no puede estar vacío').trim(),
  species: z.string({ error: 'species es obligatorio' }).min(1, 'species no puede estar vacío').trim(),
  price: z.number({ error: 'price es obligatorio' }).positive('price debe ser mayor a 0'),
  stock: z.number().int('stock debe ser entero').nonnegative('stock no puede ser negativo'),
  category: z.string().min(1, 'category no puede estar vacía').trim(),
});

export const createItemSchema = basePlantSchema.extend({
  stock: basePlantSchema.shape.stock.optional().default(0),
});

export const updateItemSchema = basePlantSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;