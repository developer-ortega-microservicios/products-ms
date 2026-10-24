# Products Microservice

Microservicio de productos hecho con **NestJS** y **TypeScript**, parte del proyecto del curso [NestJS + Microservicios](https://www.udemy.com/course/nestjs-microservicios/) (Udemy, DevTalles).

> Proyecto de práctica, **en progreso**. Se actualiza a medida que avanza el curso.

## Qué se va a construir

- CRUD de productos con paginación
- Base de datos con **Prisma** (SQLite)
- Validación de datos con DTOs y variables de entorno
- Comunicación por **Message Patterns** (TCP, luego NATS)
- Integración con un API Gateway y con el microservicio de órdenes

## Stack técnico

- **NestJS** + **TypeScript**
- **Prisma** + **SQLite**
- **Vitest** — pruebas
- **Oxlint** y **Prettier** — calidad y formato del código

## Cómo correrlo localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/developer-ortega-microservicios/products-ms.git
   cd products-ms
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```
   Si npm falla con `Cannot read properties of null (reading 'edgesOut')`, usar `npm install --legacy-peer-deps`.

3. Crear un archivo `.env` en la raíz (usar `.env.example` como referencia):
   ```
   PORT=3001
   DATABASE_URL="file:./dev.db"
   ```

4. Iniciar en modo desarrollo:
   ```bash
   npm run start:dev
   ```

## Scripts disponibles

```bash
npm run start:dev   # Desarrollo con recarga automática
npm run build       # Compila a /dist
npm run start:prod  # Ejecuta el build
npm run lint        # Oxlint
npm run test        # Pruebas unitarias
```
