import RoommateProfileForm from '@/app/ui/roommate/RoommateProfileForm'
import {Suspense} from 'react'
import { getRoommateProfile } from '@/lib/data'
export default async function CreateRoommatePage() {
    const profile = await getRoommateProfile()
    
        return (
             <Suspense fallback={<p>Loading...</p>}>
                    <RoommateProfileForm existing={profile} />
                </Suspense>
        )
    
}