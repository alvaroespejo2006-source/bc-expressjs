// Paso 1: tipos del dominio (adaptado de Product -> Plant)

export interface Plant {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface Report {
  totalPlants: number;
  totalValue: number;
  categories: string[];
  lowStockItems: Plant[];
}
