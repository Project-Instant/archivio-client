import { Skeleton } from "@/shared/ui/skeleton";
import { clientOnly } from "vike-react/clientOnly";

const ThemeSwitcher = clientOnly(async () => (await import("../../components/edit-appearance-form")).ThemeSwitcher)
const GridColumnsNumberSelector = clientOnly(async () => (await import("../../components/edit-appearance-form")).GridColumnsNumberSelector)

export default function ApperancePage() {
  return (
    <div className="flex flex-col w-full h-full gap-8">
      <div className="flex flex-col w-full h-full gap-2">
        <h1 className="text-2xl font-bold">
          Персонализация
        </h1>
        <p className="text-lg text-muted-foreground">
          Здесь можно настроить внешний вид приложения
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Тема</p>
          <span className="text-muted-foreground">
            Вы можете выбрать один из двух цветовых режимов
          </span>
        </div>
        <ThemeSwitcher fallback={<Skeleton className="h-9 w-12"/>} />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Сетка</p>
          <span className="text-muted-foreground">
            От этого зависит количество колонок в сетке
          </span>
        </div>
        <GridColumnsNumberSelector fallback={<Skeleton className="h-9 w-12"/>}/>
      </div>
    </div>
  )
}