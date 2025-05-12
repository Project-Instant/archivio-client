import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { AuthDialogForm } from "../components/auth-form";

export default function AuthPage() {
  return (
    <div className="flex items-center relative grow overflow-hidden w-full">
      <div className="absolute z-[2] w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1437846972679-9e6e537be46e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover h-full w-full brightness-75"
          alt="Login"
        />
      </div>
      <ContainerWrapper variant="none">
        <div className="flex flex-col gap-6 md:flex-row items-center relative z-[3] h-full justify-between w-full">
          <h1 className="m-2 text-4xl xl:leading-20 xl:text-6xl font-bold text-white xl:w-[30%]">
            Log in to get your ideas
          </h1>
          <AuthDialogForm />
        </div>
      </ContainerWrapper>
    </div>
  )
}