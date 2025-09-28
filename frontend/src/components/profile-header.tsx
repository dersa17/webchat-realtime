import { useRef, useState } from "react";
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      const base64Image = reader.result as string
      setSelectedImage(base64Image);
      updateProfile(base64Image)

    }

  };

  return (
    <div className="p-4 border-b border-gray-300 bg-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full p-0 overflow-hidden relative group h-14 w-14"
              onClick={() => fileInputRef.current?.click()}
            >
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={selectedImage || authUser?.profilePic || "/avatar.png"}
                  alt="User image"
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-200 text-gray-600">
                  {authUser?.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </Button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USER INFO */}
          <div>
            <h3 className="font-semibold text-sm text-gray-800 max-w-[180px] truncate">
              {authUser?.fullName}
            </h3>
            <p className="text-green-500 text-xs">Online</p>
          </div>
        </div>

        {/* LOGOUT BTN */}
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="text-gray-400 hover:text-red-500 focus:ring-0"
        >
          <LogOutIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
export default ProfileHeader;
