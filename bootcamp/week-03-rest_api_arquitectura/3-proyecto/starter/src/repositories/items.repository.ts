// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================
// Reglas de esta capa:
// - Único punto de acceso al store (array, DB, archivo)
// - Todos los métodos deben ser async Promise<T>
// - Retornar copias defensivas (no la referencia interna)
// - Si no encuentra un elemento, retornar undefined

import { Plant, CreatePlantDto, UpdatePlantDto } from '../types';

const store: Plant[] = [
  { id: 1, name: 'Suculenta', species: 'Echeveria elegans', price: 15000, stock: 20, category: 'cactus', createdAt: new Date().toISOString() },
  { id: 2, name: 'Potus', species: 'Epipremnum aureum', price: 12000, stock: 30, category: 'interior', createdAt: new Date().toISOString() },
  { id: 3, name: 'Ficus lyrata', species: 'Ficus lyrata', price: 45000, stock: 8, category: 'interior', createdAt: new Date().toISOString() },
  { id: 4, name: 'Cactus barril', species: 'Echinocactus grusonii', price: 25000, stock: 15, category: 'cactus', createdAt: new Date().toISOString() },
  { id: 5, name: 'Helecho', species: 'Nephrolepis exaltata', price: 18000, stock: 12, category: 'exterior', createdAt: new Date().toISOString() },
];
let nextId = 6;

export async function findAll(): Promise<Plant[]> {
  return [...store];
}

export async function findById(id: number): Promise<Plant | undefined> {
  return store.find((item) => item.id === id);
}

export async function create(dto: CreatePlantDto): Promise<Plant> {
  const item: Plant = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(item);
  return { ...item }; // copia defensiva
}

export async function update(id: number, dto: UpdatePlantDto): Promise<Plant | undefined> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}