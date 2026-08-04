// Paso 2: lectura de archivo con fs/promises (no bloquea el Event Loop)

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Plant } from './types.js';

export async function readPlants(): Promise<Plant[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'plants.json');

  // await pausa la función hasta que readFile termine — sin bloquear el Event Loop
  const raw = await readFile(filePath, 'utf-8');

  // JSON.parse convierte el string JSON en un objeto JavaScript
  return JSON.parse(raw) as Plant[];
}
