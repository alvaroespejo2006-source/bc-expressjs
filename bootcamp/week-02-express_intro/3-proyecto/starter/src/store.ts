import type { Plant, CreatePlantDto, UpdatePlantDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
// Los datos se pierden al reiniciar el servidor (se usará BD a partir de week-05)
const plants: Plant[] = [];
let nextId = 1;

// Retorna todas las plantas del array
export function getAll(): Plant[] {
  return plants;
}

// Retorna la planta con el id dado, o undefined si no existe
export function getById(id: number): Plant | undefined {
  return plants.find((plant) => plant.id === id);
}

// Crea una nueva planta con un id autoincremental y la retorna
export function create(data: CreatePlantDto): Plant {
  const newPlant: Plant = { id: nextId++, ...data };
  plants.push(newPlant);
  return newPlant;
}

// Actualiza la planta con el id dado y la retorna, o undefined si no existe
export function update(id: number, data: UpdatePlantDto): Plant | undefined {
  const index = plants.findIndex((plant) => plant.id === id);
  if (index === -1) return undefined;

  plants[index] = { ...plants[index], ...data };
  return plants[index];
}

// Elimina la planta con el id dado y retorna true, o false si no existe
export function remove(id: number): boolean {
  const index = plants.findIndex((plant) => plant.id === id);
  if (index === -1) return false;

  plants.splice(index, 1);
  return true;
}