import { PropsWithChildren } from "react"
import { Header } from "../header/header"

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}