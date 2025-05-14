import consola from "consola";
import { JSX } from "react";

export const logImport = (title: string, component: Promise<{ default: (props: object) => JSX.Element }>) => {
  consola.info(`${title} ` + `${!!component ? "imported" : "not imported"}`)
}