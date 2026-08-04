// Dominio: Vivero de Plantas
// El recurso principal del proyecto es "Plant", adaptado del "Item" genérico del starter.

export interface Plant {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  active: boolean;
}

export interface Summary {
  total: number;
  activeCount: number;
  inactiveCount: number;
  averagePrice: number;
  mostExpensive: Plant;
  cheapest: Plant;
}

export interface Report {
  generatedAt: string;
  filterApplied: string | null;
  summary: Summary;
  plants: Plant[];
}
