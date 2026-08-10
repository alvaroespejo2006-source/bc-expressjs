// ============================================
// TYPES: Interfaz del recurso principal
// ============================================
// Dominio: Vivero de plantas

export interface Plant {
  id: number;
  name: string;
  species: string;
  price: number;
  stock: number;
  category: string;
}

// DTO usado para crear una nueva planta (sin id, se genera automáticamente)
export type CreatePlantDto = Omit<Plant, 'id'>;

// DTO para actualización (todos los campos editables)
export type UpdatePlantDto = Partial<CreatePlantDto>;