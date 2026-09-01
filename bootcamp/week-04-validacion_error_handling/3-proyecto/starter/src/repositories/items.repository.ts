// ============================================
// REPOSITORY — capa de acceso a datos (en memoria)
// ============================================
import { Plant } from '../types';

export type CreatePlantRepoDto = Omit<Plant, 'id' | 'createdAt'>;
export type UpdatePlantRepoDto = Partial<CreatePlantRepoDto>;

let items: Plant[] = [
  { id: 1, name: 'Suculenta', species: 'Echeveria elegans', price: 15000, stock: 20, category: 'cactus', createdAt: new Date() },
  { id: 2, name: 'Potus', species: 'Epipremnum aureum', price: 12000, stock: 30, category: 'interior', createdAt: new Date() },
  { id: 3, name: 'Ficus lyrata', species: 'Ficus lyrata', price: 45000, stock: 8, category: 'interior', createdAt: new Date() },
];

let nextId = 4;

export async function findAll(): Promise<Plant[]> {
  return [...items];
}

export async function findById(id: number): Promise<Plant | undefined> {
  return items.find((i) => i.id === id);
}

export async function create(dto: CreatePlantRepoDto): Promise<Plant> {
  const item: Plant = { id: nextId++, ...dto, createdAt: new Date() };
  items.push(item);
  return { ...item };
}

export async function update(id: number, dto: UpdatePlantRepoDto): Promise<Plant | undefined> {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return undefined;
  items[index] = { ...items[index]!, ...dto };
  return { ...items[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}