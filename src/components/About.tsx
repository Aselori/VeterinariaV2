export default function About() {
  return (
    <section id="about" className="bg-warm-100 dark:bg-slate-800 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-warm-200 dark:bg-slate-700 aspect-[4/3] flex items-center justify-center">
            {/*
             * Replace this div with:
             * <Image src="/about-photo.jpg" alt="Our team" fill className="object-cover" />
             * and add className="relative" to the parent div
             */}
            <p className="text-sm text-gray-600 dark:text-gray-400">Añade la foto de la clínica aquí</p>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              Quiénes Somos
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Somos un equipo dedicado de profesionales veterinarios comprometidos
              con brindar la mejor atención posible para tus mascotas.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Nuestra clínica combina la medicina moderna con un ambiente cálido
              y familiar donde las mascotas se sienten seguras y los dueños, escuchados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
