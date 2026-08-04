// Paso 4: entry point con IIFE async y try/catch

import { readPlants } from './reader.js';
import { generateReport } from './processor.js';

async function main(): Promise<void> {
  try {
    console.log('Reading plant data...\n');

    const plants = await readPlants();
    const report = generateReport(plants);

    console.log('=== 🌱 Plant Report ===');
    console.log(`Total plants: ${report.totalPlants}`);
    console.log(`Total inventory value: $${report.totalValue.toFixed(2)}`);
    console.log(`Categories: ${report.categories.join(', ')}`);

    if (report.lowStockItems.length > 0) {
      console.log('\n⚠️  Low stock plants:');
      report.lowStockItems.forEach((p) => {
        console.log(`  - ${p.name} (stock: ${p.stock})`);
      });
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
