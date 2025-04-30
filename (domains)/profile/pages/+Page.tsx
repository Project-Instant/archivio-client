import { useUpdate } from '@reatom/npm-react'
import { useData } from "vike-react/useData"
import { Data } from "./+data"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { paramAtom } from '../models/profile.model'
import { ProfilePageInfo } from '../components/profile-page-info'
import { ProfilePageFollows } from '../components/profile-page-follows'
import { ProfilePageFollowers } from '../components/profile-page-followers'
import { ProfilePageAbout } from '../components/profile-page-about'
import { ProfilePageTags } from '../components/profile-page-tags'
import { ProfilePageContent } from '../components/profile-page-content'

const SyncProfileParam = () => useUpdate(paramAtom, [useData<Data>().id])

export default function ProfilePage() {
  return (
    <ContainerWrapper>
      <SyncProfileParam />
      <div className="flex w-full h-56 relative mb-8">
        <ProfilePageInfo />
      </div>
      <div className="mt-12 mb-8">
        <div className="flex flex-wrap gap-6 mb-6">
          <ProfilePageFollows />
          <ProfilePageFollowers />
        </div>
        <div className="mb-6">
          <ProfilePageAbout />
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          <ProfilePageTags />
        </div>
      </div>
      <ProfilePageContent />
    </ContainerWrapper>
  )
}