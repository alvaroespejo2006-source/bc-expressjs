import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Plant } from './types.js';

// import.meta.dirname = directorio del archivo actual (equivalente ESM de __dirname)
const DATA_PATH = join(import.meta.dirname, '..', 'data', 'plants.json');

/**
 * Lee y parsea el catálogo de plantas del vivero.
 * Usa fs/promises (no fs.readFileSync) para no bloquear el Event Loop.
 */
export async function readPlants(): Promise<Plant[]> {
  let raw: string;

  try {
    raw = await readFile(DATA_PATH, 'utf-8');
  } catch (error) {
    // Requisito: si data/plants.json no existe, error descriptivo + exit(1)
    console.error(`❌ No se encontró el archivo de datos en: ${DATA_PATH}`);
    console.error('   Verifica que data/plants.json exista antes de ejecutar la herramienta.');
    process.exit(1);
  }

  try {
    return JSON.parse(raw) as Plant[];
  } catch {
    console.error('❌ El archivo plants.json no contiene un JSON válido.');
    process.exit(1);
  }
}
