# Products Microservice

Microservicio de productos hecho con **NestJS**, **Prisma** y **TypeScript**, parte del proyecto del curso [NestJS + Microservicios](https://www.udemy.com/course/nestjs-microservicios/) (Udemy, DevTalles). Escucha mensajes de **NATS**; no expone HTTP directamente, el acceso es a través del [client-gateway](https://github.com/developer-ortega-microservicios/client-gateway).

> Proyecto de práctica completado: este servicio forma parte de una tienda de 5 microservicios desplegada en **Google Kubernetes Engine (GKE)** con Helm. Ver el [launcher](https://github.com/developer-ortega-microservicios/products-launcher).

## Arquitectura

```
client-gateway  ──NATS──→  products-ms  →  SQLite (Prisma)
orders-ms       ──NATS──→  products-ms   (validación de productos)
```

Repositorios relacionados en la organización [developer-ortega-microservicios](https://github.com/developer-ortega-microservicios).

## Funcionalidades

- CRUD de productos con paginación
- Eliminación suave (el producto se marca como no disponible)
- Validación de productos por ids, usada por `orders-ms`
- Comunicación por **Message Patterns** sobre NATS
- Manejo de excepciones RPC
- Variables de entorno validadas con **Joi**

## Stack técnico

- **NestJS** + **TypeScript**
- **Prisma** + **SQLite**
- **NATS** (`@nestjs/microservices`)
- **Joi** y **class-validator**
- **Vitest**, **Oxlint** y **Prettier**

## Cómo correrlo localmente

1. Tener corriendo el servidor de NATS (ver el README del [client-gateway](https://github.com/developer-ortega-microservicios/client-gateway)).

2. Clonar e instalar:
   ```bash
   git clone https://github.com/developer-ortega-microservicios/products-ms.git
   cd products-ms
   npm install
   ```
   Si npm falla con `Cannot read properties of null (reading 'edgesOut')`, usar `npm install --legacy-peer-deps`.

3. Crear un archivo `.env` en la raíz (usar `.env.example` como referencia):
   ```
   PORT=3001
   DATABASE_URL="file:./dev.db"
   NATS_SERVERS=nats://localhost:4222
   ```

4. Generar el cliente de Prisma y crear la base de datos:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
   El cliente generado (`src/generated/prisma`) no se sube al repositorio, por eso hay que ejecutar `prisma generate`.

5. Iniciar en modo desarrollo:
   ```bash
   npm run start:dev
   ```

## Despliegue

- **Imagen de producción:** `dockerfile.prod` (build multi-etapa sobre `node:22-alpine`).
- **Build y publicación:** `cloudbuild.yml` construye la imagen con Cloud Build y la sube a **Artifact Registry** (`image-registry/products-ms`).
- **Kubernetes:** se despliega en GKE Autopilot con el chart de Helm `k8s/tienda-gke` del [launcher](https://github.com/developer-ortega-microservicios/products-launcher); se comunica con el resto de servicios por NATS dentro del clúster.
- **Base de datos:** SQLite dentro del contenedor (se crea en el build con `prisma migrate deploy`); es de práctica y se reinicia al recrear el pod.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servicio |
| `DATABASE_URL` | Ruta de la base de datos SQLite |
| `NATS_SERVERS` | Servidores de NATS, separados por coma |

## Scripts disponibles

```bash
npm run start:dev   # Desarrollo con recarga automática
npm run build       # Compila a /dist
npm run start:prod  # Ejecuta el build
npm run lint        # Oxlint
npm run test        # Pruebas unitarias
```
