import dynamic from "next/dynamic";
const ProfilePage = dynamic(() => import('./page-component'), { ssr: false })
export default ProfilePage;