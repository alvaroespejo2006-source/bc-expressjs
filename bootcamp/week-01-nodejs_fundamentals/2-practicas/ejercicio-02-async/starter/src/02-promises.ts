// Paso 2: patrón con Promises

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Supplier } from './types.js';

export function loadSuppliersWithPromise(): Promise<Supplier[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'suppliers.json');

  return readFile(filePath, 'utf-8')
    .then((raw) => JSON.parse(raw) as Supplier[])
    .catch((err: unknown) => {
      throw new Error(`Failed to load suppliers: ${err instanceof Error ? err.message : err}`);
    });
}
