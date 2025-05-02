import { PropsWithChildren } from "react"
import { Header } from "../header/components/header"

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}