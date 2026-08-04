import type { Plant, Summary } from './types.js';

/**
 * Filtra el catálogo por categoría. Si la categoría no existe,
 * retorna null para que el caller decida cómo avisar al usuario.
 */
export function filterByCategory(plants: Plant[], category: string): Plant[] | null {
  const filtered = plants.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
  return filtered.length > 0 ? filtered : null;
}

export function getAvailableCategories(plants: Plant[]): string[] {
  return [...new Set(plants.map((p) => p.category))];
}

/**
 * Calcula el resumen del catálogo: total, activos/inactivos, precio
 * promedio, y la planta más cara y más barata.
 */
export function buildSummary(plants: Plant[]): Summary {
  const activeCount = plants.filter((p) => p.active).length;
  const totalPrice = plants.reduce((sum, p) => sum + p.price, 0);

  const sortedByPrice = [...plants].sort((a, b) => a.price - b.price);
  const cheapest = sortedByPrice[0]!;
  const mostExpensive = sortedByPrice[sortedByPrice.length - 1]!;

  return {
    total: plants.length,
    activeCount,
    inactiveCount: plants.length - activeCount,
    averagePrice: Math.round((totalPrice / plants.length) * 100) / 100,
    mostExpensive,
    cheapest,
  };
}
