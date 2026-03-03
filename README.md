# VetClinic — Sistema de Gestión Veterinaria

Proyecto académico. Aplicación web completa para una clínica veterinaria con sitio público y portal de administración.

## Tecnologías

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma** + SQLite
- **NextAuth v5** (autenticación con credenciales)
- **Recharts** (gráficas del dashboard)
- **pnpm**

## Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Aplicar migraciones y generar cliente Prisma
pnpm prisma migrate dev

# Poblar la base de datos con datos de prueba
pnpm db:seed

# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Credenciales de prueba

| Rol   | Correo                   | Contraseña |
|-------|--------------------------|------------|
| Admin | admin@vetclinic.com      | admin123   |
| Usuario | usuario@vetclinic.com  | user123    |

## Estructura del proyecto

```
src/
  app/
    admin/          # Portal de administración (dashboard, citas, usuarios)
    api/            # Rutas API (auth, chat, admin)
    login/          # Página de inicio de sesión
    page.tsx        # Sitio público
  components/
    admin/          # Componentes del portal admin
      layout/       # Barra lateral
      dashboard/    # Tarjetas de stats y gráficas
      citas/        # Tabla, modales CRUD
      usuarios/     # Tabla y modal de rol
  constants/        # Servicios y navegación
  context/          # DarkModeContext
  hooks/            # useChat
  lib/              # Prisma, auth guard, IA
  types/            # Interfaces TypeScript
prisma/
  schema.prisma     # Modelos User y Appointment
  seed.ts           # Datos de prueba (usuarios + 20 citas)
  migrations/       # Historial de migraciones
```

## Funcionalidades

### Sitio público
- Landing page con secciones: hero, servicios, reserva de cita, contacto
- Chatbot con IA (configurable vía `.env.local`)
- Modo oscuro persistente (Tailwind v4 + `localStorage`)
- Autenticación con NextAuth v5

### Portal de administración (`/admin`)
- **Dashboard** — estadísticas en tiempo real y gráficas de citas por servicio y por mes
- **Citas** — CRUD completo con filtros por estado y servicio, paginación
- **Usuarios** — listado, cambio de rol y eliminación (con protección de cuenta propia)
- Barra lateral fija con navegación y alternador de modo oscuro

## Variables de entorno

Crea un archivo `.env.local` en la raíz:

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="tu_secreto_aqui"

# Opcional — para el chatbot
OPENAI_API_KEY=tu_clave
# o
GEMINI_API_KEY=tu_clave
```
