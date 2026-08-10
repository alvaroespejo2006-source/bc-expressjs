# Proyecto Semana 03 — API REST Vivero de Plantas (Arquitectura en Capas)

## 🌱 Dominio

**Vivero de plantas** — gestión del inventario con arquitectura en 4 capas.

## 🏗️ Arquitectura

- **Repository**: único punto de acceso al store en memoria. Métodos `async`.
- **Service**: lógica de negocio y paginación. Sin dependencias de Express.
- **Controller**: extrae datos de `req`, llama al service, responde con `res`.
- **Routes**: solo mapea URL + método HTTP → función del controller.

## 📦 Recurso: Plant

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | number | Identificador autoincremental |
| name | string | Nombre común |
| species | string | Especie botánica |
| price | number | Precio de venta |
| stock | number | Cantidad disponible |
| category | string | Categoría (cactus, interior, exterior) |
| createdAt | string | Fecha de creación (ISO) |

## 🔗 Endpoints

| Método | Ruta | Status | Descripción |
|--------|------|--------|-------------|
| GET | `/api/v1/plants?page&limit` | 200 | Listar con paginación |
| GET | `/api/v1/plants/:id` | 200 / 404 | Obtener por ID |
| POST | `/api/v1/plants` | 201 | Crear planta |
| PUT | `/api/v1/plants/:id` | 200 / 404 | Actualizar planta |
| DELETE | `/api/v1/plants/:id` | 204 / 404 | Eliminar planta |

## 📄 Contratos de respuesta

```json
// GET /plants?page=1&limit=3 → 200
{ "data": [...], "total": 5, "page": 1, "limit": 3 }

// GET /plants/1 → 200
{ "data": { "id": 1, "name": "Suculenta", ... } }

// GET /plants/999 → 404
{ "error": "Not Found", "message": "Plant 999 not found" }
```

## 🧪 Pruebas realizadas

- ✅ GET con paginación → datos correctos + metadata
- ✅ GET por ID → objeto envuelto en `data`
- ✅ GET id inexistente → 404 con contrato de error
- ✅ POST → 201 con la planta creada
- ✅ PUT → actualización parcial correcta
- ✅ DELETE → 204 sin body