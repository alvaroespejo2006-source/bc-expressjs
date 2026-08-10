# Proyecto Semana 02 — API REST Vivero de Plantas

## 🌱 Dominio

**Vivero de plantas** — gestión del inventario de plantas disponibles para la venta.

## 📦 Recurso principal: Plant

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | number | Identificador autoincremental |
| name | string | Nombre común de la planta (ej: "Suculenta") |
| species | string | Especie botánica (ej: "Echeveria elegans") |
| price | number | Precio de venta |
| stock | number | Cantidad disponible en inventario |
| category | string | Categoría (ej: "cactus", "interior", "exterior") |

## 🔗 Endpoints

| Método | Ruta | Descripción | Status |
|--------|------|-------------|--------|
| GET | `/api/v1/plants` | Listar todas las plantas | 200 |
| GET | `/api/v1/plants/:id` | Obtener una planta por ID | 200 / 404 |
| POST | `/api/v1/plants` | Crear una nueva planta | 201 |
| PUT | `/api/v1/plants/:id` | Actualizar una planta | 200 / 404 |
| DELETE | `/api/v1/plants/:id` | Eliminar una planta | 204 / 404 |

## 🧱 Decisiones de diseño

- **Store en memoria**: se usa un array (`plants.ts`) como base de datos temporal, con un `id` autoincremental generado en el servidor. Los datos se pierden al reiniciar — a partir de la semana 5 se reemplaza por una base de datos real (PostgreSQL/Prisma).
- **Separación de responsabilidades**: `types.ts` define los contratos de datos, `store.ts` encapsula el acceso a los datos, `routes/plants.routes.ts` solo maneja HTTP (status codes, params, body) y delega la lógica al store.
- **Middlewares en orden**: `express.json()` → logger → rutas → 404 handler → error handler global, siguiendo el patrón estándar de Express para que los errores se capturen correctamente al final de la cadena.
- **Graceful shutdown**: el servidor escucha `SIGTERM` y `SIGINT` para cerrar las conexiones activas antes de terminar el proceso, evitando peticiones cortadas abruptamente.

## 🧪 Pruebas realizadas

Se probaron los 5 endpoints con `curl`, verificando código de estado y payload en cada caso:

- ✅ `GET /api/v1/plants` → `[]` (lista vacía inicial)
- ✅ `POST /api/v1/plants` → `201` con la planta creada
- ✅ `GET /api/v1/plants/:id` → `200` con los datos correctos
- ✅ `PUT /api/v1/plants/:id` → `200` con los campos actualizados
- ✅ `DELETE /api/v1/plants/:id` → `204` sin body
- ✅ `GET /api/v1/plants/:id` (tras borrar) → `404` con `{"error":"Plant not found"}`