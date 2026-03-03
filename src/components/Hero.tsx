import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-warm-50 dark:bg-slate-900 py-24 md:py-36 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            Clínica Veterinaria
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 dark:text-gray-100 max-w-2xl leading-tight mb-6">
            Cuidando a tus Mascotas con Amor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed mb-10">
            Servicios veterinarios profesionales en los que puedes confiar. Porque tus mascotas merecen lo mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-8 py-3 bg-warm-200 text-gray-800 font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Reservar una Cita
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:border-warm-200 dark:hover:border-warm-200 transition-colors"
            >
              Conocer Más
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 w-full max-w-md md:max-w-none">
          <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
            <Image
              src="/hero-dog.jpg"
              alt="Cachorro recibiendo atención veterinaria"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
