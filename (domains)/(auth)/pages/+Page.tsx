import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { AuthDialogForm } from "../components/auth-form";
import { reatomComponent } from "@reatom/npm-react";
import { authDialogIsOpenAtom } from "../models/auth-dialog.model";

const AuthDialogFormWrapper = reatomComponent(({ ctx }) => {
  if (ctx.spy(authDialogIsOpenAtom)) {
    return null;
  }

  return <AuthDialogForm />;
}, "AuthDialogFormWrapper")

export default function AuthPage() {
  return (
    <div className="flex items-center relative grow min-h-[93vh] overflow-hidden w-full">
      <div className="absolute z-[2] w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1437846972679-9e6e537be46e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover h-full w-full brightness-75"
          alt=""
        />
      </div>
      <ContainerWrapper variant="none">
        <div className="flex flex-col gap-6 md:flex-row items-center relative z-[3] h-full justify-between w-full">
          <h1 className="m-2 text-4xl xl:leading-20 xl:text-6xl font-bold text-white xl:w-[30%]">
            {" "}
          </h1>
          <AuthDialogFormWrapper />
        </div>
      </ContainerWrapper>
    </div>
  )
}