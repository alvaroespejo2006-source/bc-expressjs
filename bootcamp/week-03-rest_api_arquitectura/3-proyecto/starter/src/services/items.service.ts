// ============================================
// SERVICE — Lógica de negocio
// ============================================
// Reglas de esta capa:
// - CERO imports de Express (sin Request, Response, NextFunction)
// - Llama al repository para acceder a datos
// - Contiene la paginación y validaciones de dominio
// - Retorna undefined cuando no encuentra; el controller maneja el 404

import { CreatePlantDto, UpdatePlantDto, Plant, PaginatedResponse, PaginationParams } from '../types';
import * as repo from '../repositories/items.repository';

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Plant>> {
  const { page, limit } = params;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Plant | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreatePlantDto): Promise<Plant> {
  // Validación de negocio: precio y stock no negativos
  return repo.create(dto);
}

export async function update(id: number, dto: UpdatePlantDto): Promise<Plant | undefined> {
  const exists = await repo.findById(id);
  if (!exists) return undefined;
  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) return false;
  return repo.remove(id);
}