import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/items.service';
import { createPlantSchema, updatePlantSchema } from '../schemas/items.schema';
import { AppError } from '../errors/AppError';

const idSchema = z.coerce.number().int().positive();

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const result = await service.findAll(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = idSchema.parse(req.params['id']);
    const plant = await service.findById(id);
    if (!plant) throw new AppError(404, 'Planta no encontrada');
    res.json(plant);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createPlantSchema.parse(req.body);
    const plant = await service.create(dto);
    res.status(201).json(plant);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = idSchema.parse(req.params['id']);
    const dto = updatePlantSchema.parse(req.body);
    const plant = await service.update(id, dto);
    res.json(plant);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = idSchema.parse(req.params['id']);
    await service.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}