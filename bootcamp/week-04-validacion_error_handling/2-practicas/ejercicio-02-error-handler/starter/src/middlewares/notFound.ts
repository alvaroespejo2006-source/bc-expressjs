// ============================================
// MIDDLEWARES — notFound (rutas no encontradas)
// ============================================
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

// ============================================
// PASO 2 — Middleware notFound
// Se activa cuando ninguna ruta coincide.
// ============================================
export function notFound(req: Request, _res: Response, next: NextFunction): void {
  // Pasamos un AppError al siguiente middleware de errores
  next(new AppError(404, `Ruta ${req.method} ${req.path} no encontrada`));
}