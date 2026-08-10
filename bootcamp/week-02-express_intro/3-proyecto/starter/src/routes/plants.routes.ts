import { Router } from 'express';
import * as store from '../store.js';
import type { CreatePlantDto, UpdatePlantDto } from '../types.js';

export const plantsRouter = Router();

// GET /plants — Listar todos los recursos
// Status: 200
plantsRouter.get('/', (_req, res) => {
  res.json(store.getAll());
});

// GET /plants/:id — Obtener recurso por ID
// Status: 200 si existe | 404 si no existe
plantsRouter.get('/:id', (req, res) => {
  const plant = store.getById(Number(req.params.id));
  if (!plant) {
    res.status(404).json({ error: 'Plant not found' });
    return;
  }
  res.json(plant);
});

// POST /plants — Crear nuevo recurso
// Status: 201
plantsRouter.post('/', (req, res) => {
  const data = req.body as CreatePlantDto;
  const newPlant = store.create(data);
  res.status(201).json(newPlant);
});

// PUT /plants/:id — Actualizar recurso completo
// Status: 200 si existe | 404 si no existe
plantsRouter.put('/:id', (req, res) => {
  const data = req.body as UpdatePlantDto;
  const updated = store.update(Number(req.params.id), data);
  if (!updated) {
    res.status(404).json({ error: 'Plant not found' });
    return;
  }
  res.json(updated);
});

// DELETE /plants/:id — Eliminar recurso
// Status: 204 si existe | 404 si no existe
plantsRouter.delete('/:id', (req, res) => {
  const deleted = store.remove(Number(req.params.id));
  if (!deleted) {
    res.status(404).json({ error: 'Plant not found' });
    return;
  }
  res.status(204).send();
});