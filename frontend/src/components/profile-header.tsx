import { Button } from "./ui/button"
import { useAuthStore } from "@/store/useAuthStore"

const ProfileHeader = () => {
    const {logout} = useAuthStore()
  return (
    <>
    <div>profile-header</div>
    <Button onClick={logout}>Logout</Button>
    </>

  )
}

export default ProfileHeader