# 🌱 Procesador de Datos — Vivero de Plantas (Semana 01)

## Dominio asignado

**Vivero de plantas** — Ficha 3228970, bc-expressjs.
Entidades del dominio: `plants, categories, sales, suppliers`.

Este proyecto adapta el recurso genérico `Item` del starter a `Plant`,
el recurso principal del catálogo del vivero.

## Descripción de la implementación

Herramienta CLI en Node.js + TypeScript (ESM) que:

1. Lee el catálogo del vivero desde `data/plants.json` con `fs/promises`.
2. Calcula un resumen: total de plantas, activas/inactivas, precio
   promedio, planta más cara y más barata.
3. Permite filtrar por categoría con `--category <nombre>`.
4. Genera un reporte en `output/report.json`.
5. Maneja errores: archivo inexistente (`process.exit(1)`) y categoría
   no encontrada (avisa y lista las categorías disponibles).

## Modelo de datos

```ts
interface Plant {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  active: boolean;
}
```

## Cómo ejecutar

```bash
pnpm install
pnpm dev                          # todas las plantas
pnpm dev -- --category interior   # filtrado por categoría
pnpm build && pnpm start          # build de producción
```

## Categorías disponibles en los datos de ejemplo

`interior`, `suculentas`, `exterior`, `aromaticas`, `arboles`
