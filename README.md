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
# 1. Instalar dependencias
pnpm install

# 2. Crear el archivo de variables de entorno
cp .env.example .env.local
# Luego edita .env.local y completa los valores (ver sección "Variables de entorno")

# 3. Aplicar migraciones y generar el cliente Prisma
pnpm prisma migrate deploy

# 4. Poblar la base de datos con datos de prueba
pnpm db:seed

# 5. Iniciar servidor de desarrollo
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
- **Chatbot VetBot** (Google Gemini) — triaje de problemas de salud de mascotas y
  agendamiento de citas directamente desde el chat
- Formulario de reserva de cita que persiste en la base de datos
- Modo oscuro persistente (Tailwind v4 + `localStorage`)
- Autenticación con NextAuth v5

### Portal de administración (`/admin`)
- **Dashboard** — estadísticas en tiempo real y gráficas de citas por servicio y por mes
- **Citas** — CRUD completo con filtros por estado y servicio, paginación
- **Usuarios** — listado, cambio de rol y eliminación (con protección de cuenta propia)
- Barra lateral fija con navegación y alternador de modo oscuro

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```env
# Base de datos SQLite
DATABASE_URL="file:./prisma/dev.db"

# Secreto de NextAuth v5 — genera uno con: openssl rand -base64 32
AUTH_SECRET=

# API key de Google Gemini para el chatbot VetBot
# Obtén una gratis en https://aistudio.google.com/apikey
GEMINI_API_KEY=
```

El chatbot VetBot requiere `GEMINI_API_KEY` para funcionar. Sin ella, el
endpoint `/api/chat` devolverá un error 500.
