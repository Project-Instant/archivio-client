import { Loader } from "@/shared/ui/loader"

export const SectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 h-svh items-center justify-center">
      <span className="font-semibold text-xl">Archivio</span>
      <Loader />
    </div>
  )
}