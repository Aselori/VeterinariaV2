export default function Hero() {
  return (
    /*
     * To add a background image:
     * 1. Place your image at /public/hero-bg.jpg
     * 2. Add to <section>: style={{ backgroundImage: 'url(/hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
     * 3. Uncomment the overlay <div> below
     */
    <section
      id="home"
      className="relative bg-warm-50 dark:bg-slate-900 py-24 md:py-36"
    >
      {/* Overlay — uncomment when using background image */}
      {/* <div className="absolute inset-0 bg-warm-50/80 dark:bg-slate-900/85" /> */}

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
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
    </section>
  )
}
