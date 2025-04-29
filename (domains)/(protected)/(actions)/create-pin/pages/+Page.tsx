import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { CreatePinForm } from "../components/create-pin-form/create-pin-form";

const CreatePinPanel = () => {
  return (
    <div className="flex flex-col py-6 items-center gap-4 w-24 h-full border-t border-r border-b border-neutral-700">
      <ArrowLeft
        onClick={() => window.history.back()}
        size={34}
        className="text-neutral-900 cursor-pointer"
      />
    </div>
  )
}

export default function CreatePinPage() {
  return (
    <div className="flex items-start w-full h-svh">
      <CreatePinPanel />
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center w-full px-6 h-24 justify-between border-t border-r border-b border-neutral-700">
          <h1 className="font-bold text-xl">Создание пина</h1>
          <div className="flex items-center gap-4">
            <Button className="font-semibold text-lg hover:bg-emerald-800 bg-emerald-700 text-neutral-50">
              Создать пин
            </Button>
          </div>
        </div>
        <CreatePinForm />
      </div>
    </div>
  )
}