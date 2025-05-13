import { useUpdate } from "@reatom/npm-react"
import { pinParamAtom } from "../models/pin.model"
import { useData } from "vike-react/useData"
import { Data } from "./+data"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { PinHead } from "../components/pin-head"
import { PinRecommendations } from "../components/pin-recommendations"

const SyncPinParam = () => useUpdate(pinParamAtom, [useData<Data>().id])

export default function PinPage() {
  return (
    <ContainerWrapper>
      <SyncPinParam />
      <div className="flex flex-col gap-12 w-full justify-center h-full pt-16">
        <PinHead />
        <PinRecommendations />
      </div>
    </ContainerWrapper>
  )
}