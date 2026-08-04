// Paso 5: cargar dos archivos AL MISMO TIEMPO con Promise.all

import { readFile } from 'fs/promises';
import { join } from 'path';
import { loadSuppliersWithAsync } from './03-async-await.js';
import type { Plant } from './types.js';

async function loadPlantsWithAsync(): Promise<Plant[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'plants.json');
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as Plant[];
}

export async function loadAllData(): Promise<void> {
  console.time('parallel');

  // Ambas lecturas se inician simultáneamente — no esperamos una para empezar la otra
  const [suppliers, plants] = await Promise.all([
    loadSuppliersWithAsync(),
    loadPlantsWithAsync(),
  ]);

  console.timeEnd('parallel');
  console.log(`Loaded ${suppliers.length} suppliers and ${plants.length} plants in parallel`);
}
