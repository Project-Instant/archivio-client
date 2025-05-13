import { useUpdate } from '@reatom/npm-react'
import { useData } from "vike-react/useData"
import { Data } from "./+data"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { initProfileAction, profileParamAtom } from '../models/profile.model'
import { ProfileInfo } from '../components/profile-page-info'
import { ProfileFollows } from '../components/profile-page-follows'
import { ProfileFollowers } from '../components/profile-page-followers'
import { ProfileAbout } from '../components/profile-page-about'
import { ProfileTags } from '../components/profile-page-tags'
import { ProfileContent } from '../components/profile-page-content'

const SyncProfileParam = () => useUpdate(profileParamAtom, [useData<Data>().id])

const SyncProfile = () => {
  const data = useData<Data>().data
  useUpdate((ctx) => initProfileAction(ctx, data), [data])
  return null;
}

export default function ProfilePage() {
  return (
    <ContainerWrapper variant="screen">
      <SyncProfileParam />
      <SyncProfile />
      <div className="relative h-[200px] md:h-[300px] w-full rounded-xl overflow-hidden">
        <img
          src={"https://images.unsplash.com/photo-1746713915201-4eed01ca887a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="s cover"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      <div className="flex flex-col gap-6 w-full relative -mt-24 mb-8">
        <ProfileInfo />
        <div className="flex md:flex-row flex-col items-start gap-4 justify-between w-full">
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <ProfileAbout />
            <div className="flex flex-wrap items-center gap-2">
              <ProfileTags />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-secondary p-6 rounded-xl w-full lg:min-w-1/4 md:w-fit md:max-w-1/3">
            <p className="font-semibold text-xl">Статистика</p>
            <ProfileFollows />
            <ProfileFollowers />
          </div>
        </div>
        <ProfileContent />
      </div>
    </ContainerWrapper>
  )
}