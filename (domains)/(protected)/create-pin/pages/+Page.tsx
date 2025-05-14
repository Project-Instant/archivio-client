import { BackNavigation } from "@/shared/components/navigation/back-navigation";
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";
import { lazy, Suspense } from "react";
import { CreatePinButton } from "../components/create-pin-form-button";
import { logImport } from "@/shared/lib/utils/log-import";

const CreatePinForm = lazy(() => {
  const component = import("../components/create-pin-form").then(m => ({ default: m.CreatePinForm }))
  logImport("CreatePinForm", component)
  return component
})

export default function CreatePinPage() {
  return (
    <ContainerWrapper className="h-svh">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center w-full lg:px-4 xl:px-6 min-h-24 max-h-24 h-24 justify-between">
          <div className="hidden lg:block">
            <BackNavigation />
          </div>
          <h1 className="font-bold text-xl text-foreground">Создание пина</h1>
          <div className="flex items-center gap-4">
            <CreatePinButton />
          </div>
        </div>
        <Suspense>
          <CreatePinForm />
        </Suspense>
      </div>
    </ContainerWrapper>
  )
}