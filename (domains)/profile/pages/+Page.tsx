import { useUpdate } from '@reatom/npm-react'
import { useData } from "vike-react/useData"
import { Data } from "./+data"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { initProfileAction, profileParamAtom } from '../models/profile.model'
import { ProfileInfo } from '../components/profile-page-info'
import { ProfileAbout } from '../components/profile-page-about'
import { ProfileTags } from '../components/profile-page-tags'
import { ProfileContent } from '../components/profile-page-content'
import { ProfileStats } from '../components/profile-page-stats'
import { ProfileCover } from '../components/profile-page-cover'

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
      <ProfileCover />
      <div className="flex flex-col gap-6 w-full relative -mt-24 mb-8">
        <ProfileInfo />
        <div className="flex md:flex-row flex-col items-start gap-4 justify-between w-full">
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <ProfileAbout />
            <div className="flex flex-wrap items-center gap-2">
              <ProfileTags />
            </div>
          </div>
          <ProfileStats/>
        </div>
        <ProfileContent />
      </div>
    </ContainerWrapper>
  )
}