export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#home' },
  { label: 'Chat', href: '#chat' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Citas', href: '#booking' },
  { label: 'Contacto', href: '#contact' },
]
