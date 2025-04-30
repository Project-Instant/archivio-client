import { Button } from "@/shared/ui/button";
import { CreatePinForm } from "../components/create-pin-form";
import { BackNavigation } from "@/shared/components/navigation/back-navigation";
import { CreatePinFileUploader } from "../components/create-pin-form-file";

export default function CreatePinPage() {
  return (
    <div className="flex items-start w-full h-svh">
      <div className="flex flex-col py-6 items-center gap-4 w-24 h-full border-t border-r border-b border-neutral-700">
        <BackNavigation />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center w-full px-6 min-h-24 max-h-24 h-24 justify-between border-t border-r border-b border-neutral-700">
          <h1 className="font-bold text-xl">
            Создание пина
          </h1>
          <div className="flex items-center gap-4">
            <Button className="font-semibold text-lg hover:bg-emerald-800 bg-emerald-700 text-neutral-50">
              Создать пин
            </Button>
          </div>
        </div>
        <div className="flex items-start gap-8 w-full p-6 h-full justify-center">
          <CreatePinFileUploader />
          <CreatePinForm />
        </div>
      </div>
    </div>
  )
}