import { Link } from "@/shared/components/link/Link";
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";
import { AlertTriangle, ArrowLeft, Home, RefreshCw, X } from "lucide-react";
import { usePageContext } from "vike-react/usePageContext";

const ErrorPage = () => {
  const { abortReason } = usePageContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center p-4">
      <div
        className={`max-w-lg w-full transform transition-all duration-500 ease-out`}
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100">
          <div className="bg-red-500 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <X className="h-5 w-5" />
              <h2 className="font-semibold">Ошибка</h2>
            </div>
            <p className="text-sm opacity-80">
              ID: {typeof abortReason === 'string' ? abortReason : "unknown"}
            </p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-red-100 text-red-500 p-4 mb-2">
                <X strokeWidth={1.5} className={`h-12 w-12`} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Что-то пошло не так</h1>
            <p className="text-gray-600 text-center mb-6">
              При обработке вашего запроса произошла ошибка.
              Попробуйте еще раз или вернитесь на домашнюю страницу.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/"
                className="group flex items-center justify-center 
                  gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>На главную</span>
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="group flex items-center justify-center gap-2 bg-gray-200 
                hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Обновить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div
        className={`max-w-lg w-full transform transition-all duration-500 ease-out`}
      >
        <div className="text-center mb-8">
          <div className="mb-4 relative">
            <div className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-blue-100 text-blue-500 p-4 mb-2">
              <AlertTriangle strokeWidth={1.5} className={`h-16 w-16`} />
            </div>
          </div>
          <h1 className="text-9xl font-bold text-blue-500 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Страница не найдена</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Упс! Страница, которую вы ищете, не существует или, возможно, была перемещена.Ж
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="group flex items-center justify-center 
              gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>На главную</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center justify-center 
              gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Вернуться</span>
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-sm text-center text-gray-500">
            Если вы считаете, что это ошибка, обратитесь в службу поддержки.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const { is404 } = usePageContext()
  
  return (
    <ContainerWrapper>
      {is404 ? <NotFoundPage /> : <ErrorPage />}
    </ContainerWrapper>
  );
}