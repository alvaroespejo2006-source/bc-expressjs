import * as repo from '../repositories/items.repository';
import { CreatePlantDto, UpdatePlantDto } from '../schemas/items.schema';

export async function findAll(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function findById(id: number) {
  return repo.findById(id);
}

export async function create(data: CreatePlantDto) {
  return repo.create(data);
}

export async function update(id: number, data: UpdatePlantDto) {
  return repo.update(id, data);
}

export async function remove(id: number) {
  return repo.remove(id);
}