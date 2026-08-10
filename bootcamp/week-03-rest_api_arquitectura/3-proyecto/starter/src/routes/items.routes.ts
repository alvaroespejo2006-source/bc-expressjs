// ============================================
// ROUTES — Mapeo de URLs a controllers
// ============================================
// Las rutas solo conectan: URL + Método HTTP → función del controller
// No deben contener lógica ni acceder a servicios directamente.

import { Router } from 'express';
import * as controller from '../controllers/items.controller';

export const plantsRouter = Router();

plantsRouter.get('/', controller.getAll);
plantsRouter.get('/:id', controller.getById);
plantsRouter.post('/', controller.create);
plantsRouter.put('/:id', controller.update);
plantsRouter.delete('/:id', controller.remove);