// Paso 3: patrón con async/await (el estándar)

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Supplier } from './types.js';

export async function loadSuppliersWithAsync(): Promise<Supplier[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'suppliers.json');

  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Supplier[];
  } catch (err) {
    throw new Error(`Failed to load suppliers: ${err instanceof Error ? err.message : err}`);
  }
}
