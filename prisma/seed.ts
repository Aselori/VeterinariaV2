import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(Math.floor(Math.random() * 8) + 9, 0, 0, 0)
  return d
}

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@vetclinic.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@vetclinic.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'usuario@vetclinic.com' },
    update: {},
    create: {
      name: 'Usuario Demo',
      email: 'usuario@vetclinic.com',
      password: userPassword,
      role: 'USER',
    },
  })

  // Clear existing appointments before seeding
  await prisma.appointment.deleteMany({})

  const appointments = [
    // ~3 months ago
    { petName: 'Luna', ownerName: 'María López', email: 'maria@example.com', phone: '555-0101', service: '1', date: daysAgo(90), status: 'completada', userId: user.id },
    { petName: 'Max', ownerName: 'Carlos Ruiz', email: 'carlos@example.com', phone: '555-0102', service: '2', date: daysAgo(88), status: 'completada', userId: null },
    { petName: 'Bella', ownerName: 'Ana Torres', email: 'ana@example.com', phone: '555-0103', service: '3', date: daysAgo(85), status: 'completada', userId: user.id },
    { petName: 'Rocky', ownerName: 'Juan García', email: 'juan@example.com', phone: '555-0104', service: '5', date: daysAgo(80), status: 'cancelada', userId: null },

    // ~2 months ago
    { petName: 'Coco', ownerName: 'Sofía Martínez', email: 'sofia@example.com', phone: '555-0105', service: '4', date: daysAgo(65), status: 'completada', userId: user.id },
    { petName: 'Nala', ownerName: 'Diego Hernández', email: 'diego@example.com', phone: '555-0106', service: '6', date: daysAgo(60), status: 'completada', userId: null },
    { petName: 'Zeus', ownerName: 'Valeria Sánchez', email: 'valeria@example.com', phone: '555-0107', service: '1', date: daysAgo(58), status: 'completada', userId: null },
    { petName: 'Mia', ownerName: 'Andrés Flores', email: 'andres@example.com', phone: '555-0108', service: '2', date: daysAgo(55), status: 'cancelada', userId: user.id },

    // ~1 month ago
    { petName: 'Simba', ownerName: 'Camila Ramírez', email: 'camila@example.com', phone: '555-0109', service: '3', date: daysAgo(40), status: 'completada', userId: null },
    { petName: 'Lola', ownerName: 'Ricardo Morales', email: 'ricardo@example.com', phone: '555-0110', service: '4', date: daysAgo(38), status: 'completada', userId: user.id },
    { petName: 'Thor', ownerName: 'Isabella Cruz', email: 'isabella@example.com', phone: '555-0111', service: '5', date: daysAgo(35), status: 'completada', userId: null },
    { petName: 'Panda', ownerName: 'Fernando Jiménez', email: 'fernando@example.com', phone: '555-0112', service: '6', date: daysAgo(30), status: 'completada', userId: null },

    // This month
    { petName: 'Oreo', ownerName: 'Gabriela Vargas', email: 'gabriela@example.com', phone: '555-0113', service: '1', date: daysAgo(20), status: 'completada', userId: user.id, notes: 'Revisión anual' },
    { petName: 'Kira', ownerName: 'Miguel Reyes', email: 'miguel@example.com', phone: '555-0114', service: '2', date: daysAgo(18), status: 'completada', userId: null },
    { petName: 'Bruno', ownerName: 'Natalia Mendoza', email: 'natalia@example.com', phone: '555-0115', service: '3', date: daysAgo(15), status: 'confirmada', userId: user.id, notes: 'Cirugía programada' },
    { petName: 'Daisy', ownerName: 'Luis Ortega', email: 'luis@example.com', phone: '555-0116', service: '1', date: daysAgo(12), status: 'confirmada', userId: null },
    { petName: 'Toby', ownerName: 'Elena Castro', email: 'elena@example.com', phone: '555-0117', service: '4', date: daysAgo(8), status: 'pendiente', userId: user.id, notes: 'Limpieza dental' },
    { petName: 'Kitty', ownerName: 'Alejandro Romero', email: 'alejandro@example.com', phone: '555-0118', service: '6', date: daysAgo(5), status: 'pendiente', userId: null },
    { petName: 'Rex', ownerName: 'Paola Gutiérrez', email: 'paola@example.com', phone: '555-0119', service: '5', date: daysAgo(2), status: 'pendiente', userId: user.id, notes: 'Urgencia' },
    { petName: 'Mochi', ownerName: 'Sebastián Díaz', email: 'sebastian@example.com', phone: '555-0120', service: '2', date: daysAgo(1), status: 'pendiente', userId: null },
  ]

  for (const appt of appointments) {
    await prisma.appointment.create({ data: appt })
  }

  console.log(`Seed completado: ${appointments.length} citas creadas.`)
  console.log('Usuarios: admin@vetclinic.com / admin123 y usuario@vetclinic.com / user123')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
