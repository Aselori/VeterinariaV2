import LoginForm from '@/components/LoginForm'

export const metadata = {
  title: 'Iniciar Sesión — VetClinic',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-warm-50 dark:bg-slate-900 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Bienvenido
          </p>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Accede a tu cuenta de VetClinic
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-warm-100 dark:border-slate-700">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          Demo: admin@vetclinic.com / admin123
        </p>
      </div>
    </div>
  )
}
