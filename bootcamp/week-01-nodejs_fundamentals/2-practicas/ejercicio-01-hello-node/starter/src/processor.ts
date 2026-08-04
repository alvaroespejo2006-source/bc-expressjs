// Paso 3: función pura que transforma datos -> fácil de testear

import type { Plant, Report } from './types.js';

export function generateReport(plants: Plant[]): Report {
  const totalValue = plants.reduce((sum, p) => sum + p.price * p.stock, 0);

  // Set elimina duplicados automáticamente
  const categories = [...new Set(plants.map((p) => p.category))];

  // Plantas con stock menor a 5 unidades
  const lowStockItems = plants.filter((p) => p.stock < 5);

  return {
    totalPlants: plants.length,
    totalValue,
    categories,
    lowStockItems,
  };
}
