// Paso 1: patrón con Callbacks (el pasado)

import { readFile } from 'fs';
import { join } from 'path';
import type { Supplier } from './types.js';

// "error-first callback": primer argumento es error, segundo es resultado
export function loadSuppliersWithCallback(
  callback: (error: Error | null, suppliers?: Supplier[]) => void
): void {
  const filePath = join(import.meta.dirname, '..', 'data', 'suppliers.json');

  readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      callback(new Error(`Could not read file: ${err.message}`));
      return;
    }
    try {
      const suppliers = JSON.parse(data) as Supplier[];
      callback(null, suppliers);
    } catch {
      callback(new Error('Invalid JSON format'));
    }
  });
}
