import dynamic from "next/dynamic";
// const UpdateProfile = dynamic(() => import('@/components/UpdateProfile'), { ssr: false })
const ProfilePage = dynamic(() => import('./page-component'), { ssr: false })

export default ProfilePage;