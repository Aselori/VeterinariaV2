export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const SERVICES: Service[] = [
  { id: '1', title: 'Consulta General', description: 'Revisiones de rutina y evaluaciones de salud.', icon: '🩺' },
  { id: '2', title: 'Vacunación', description: 'Programas de prevención e inmunización.', icon: '💉' },
  { id: '3', title: 'Cirugía', description: 'Procedimientos quirúrgicos generales y especializados.', icon: '🔬' },
  { id: '4', title: 'Cuidado Dental', description: 'Salud bucodental y tratamientos dentales.', icon: '🦷' },
  { id: '5', title: 'Urgencias', description: 'Servicio veterinario de emergencias las 24 horas.', icon: '🚨' },
  { id: '6', title: 'Estética', description: 'Peluquería e higiene profesional para mascotas.', icon: '✂️' },
]
