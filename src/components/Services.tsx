import { SERVICES } from '@/constants/services'

export default function Services() {
  return (
    <section id="services" className="bg-warm-50 dark:bg-slate-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Lo Que Ofrecemos
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100">
            Nuestros Servicios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-warm-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-4 block">{service.icon}</span>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
