// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================
// Reglas de esta capa:
// - Exactamente 3 pasos: extraer → llamar service → responder
// - Sin lógica de negocio (no ifs de dominio, no cálculos)
// - Maneja los 404 cuando el service retorna undefined
// - Siempre usar try/catch y pasar errores a next(err)

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { CreatePlantDto, UpdatePlantDto, ErrorResponse } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 10;
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] as string);
    const item = await service.findById(id);
    if (!item) {
      const error: ErrorResponse = { error: 'Not Found', message: `Plant ${id} not found` };
      res.status(404).json(error);
      return;
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreatePlantDto;
    const item = await service.create(dto);
    res.status(201).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] as string);
    const dto = req.body as UpdatePlantDto;
    const updated = await service.update(id, dto);
    if (!updated) {
      const error: ErrorResponse = { error: 'Not Found', message: `Plant ${id} not found` };
      res.status(404).json(error);
      return;
    }
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] as string);
    const deleted = await service.remove(id);
    if (!deleted) {
      const error: ErrorResponse = { error: 'Not Found', message: `Plant ${id} not found` };
      res.status(404).json(error);
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}