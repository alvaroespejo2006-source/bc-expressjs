// ============================================
// TYPES — Vivero de plantas
// ============================================

export interface Plant {
  id: number;
  name: string;
  species: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
}

// DTO para crear — sin campos auto-generados
export type CreatePlantDto = Omit<Plant, 'id' | 'createdAt'>;

// DTO para actualizar — todos los campos opcionales
export type UpdatePlantDto = Partial<CreatePlantDto>;

// Contratos de respuesta (no cambiar nombres — son genéricos)
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}