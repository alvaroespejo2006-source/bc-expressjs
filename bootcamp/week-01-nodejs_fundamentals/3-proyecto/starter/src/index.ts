import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { readPlants } from './reader.js';
import { buildSummary, filterByCategory, getAvailableCategories } from './processor.js';
import type { Report } from './types.js';

const OUTPUT_PATH = join(import.meta.dirname, '..', 'output', 'report.json');

/**
 * Extrae el valor de --category desde process.argv, si viene.
 * Ejemplo: pnpm dev -- --category interior
 */
function getCategoryArg(): string | null {
  const args = process.argv.slice(2);
  const flagIndex = args.indexOf('--category');
  if (flagIndex === -1 || !args[flagIndex + 1]) return null;
  return args[flagIndex + 1]!;
}

async function main(): Promise<void> {
  console.log('🌱 Leyendo catálogo del vivero...\n');

  const allPlants = await readPlants();
  const categoryArg = getCategoryArg();

  let plantsToReport = allPlants;

  if (categoryArg) {
    const filtered = filterByCategory(allPlants, categoryArg);

    if (!filtered) {
      // Requisito: si la categoría no existe, avisar y listar las disponibles
      console.warn(`⚠️  No existe la categoría "${categoryArg}".`);
      console.warn(`   Categorías disponibles: ${getAvailableCategories(allPlants).join(', ')}`);
      return;
    }

    plantsToReport = filtered;
  }

  const summary = buildSummary(plantsToReport);

  console.log('=== 📊 Resumen del Vivero ===');
  console.log(`Total de plantas: ${summary.total}`);
  console.log(`Activas: ${summary.activeCount} | Inactivas: ${summary.inactiveCount}`);
  console.log(`Precio promedio: $${summary.averagePrice.toLocaleString('es-CO')}`);
  console.log(
    `Más cara: ${summary.mostExpensive.name} ($${summary.mostExpensive.price.toLocaleString('es-CO')})`
  );
  console.log(
    `Más barata: ${summary.cheapest.name} ($${summary.cheapest.price.toLocaleString('es-CO')})`
  );

  const report: Report = {
    generatedAt: new Date().toISOString(),
    filterApplied: categoryArg,
    summary,
    plants: plantsToReport,
  };

  try {
    await mkdir(join(import.meta.dirname, '..', 'output'), { recursive: true });
    await writeFile(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`\n✅ Reporte guardado en output/report.json`);
  } catch (error) {
    console.error('❌ No se pudo escribir el reporte:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
