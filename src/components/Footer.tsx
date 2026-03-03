export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="font-semibold text-white mb-3">VetClinic</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Atención veterinaria profesional para tus mascotas. Medicina moderna con calidez humana.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4">Servicios</p>
            <ul className="space-y-2">
              {['Consulta General', 'Vacunación', 'Cirugía', 'Urgencias'].map((s) => (
                <li key={s}>
                  <span className="text-sm text-gray-400">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4">Contacto</p>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-400">info@vetclinic.com</span></li>
              <li><span className="text-sm text-gray-400">+52 55 1234 5678</span></li>
              <li><span className="text-sm text-gray-400">Lun – Sáb · 8am – 6pm</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} VetClinic. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
