import { z } from 'zod';

// Schema base sin default en stock — así .partial() no lo fuerza a existir
const baseProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100).trim(),
  price: z.number({ message: 'El precio debe ser un número' }).positive('Debe ser mayor a 0'),
  stock: z.number().int('Debe ser un número entero').nonnegative('No puede ser negativo'),
});

// Para crear: stock es opcional, con default 0 aplicado explícitamente
export const createProductSchema = baseProductSchema.extend({
  stock: baseProductSchema.shape.stock.optional().default(0),
});

// Para actualizar: todos los campos opcionales, SIN default
export const updateProductSchema = baseProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;