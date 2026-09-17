import { useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, CameraIcon, LoaderIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import Avatar from "./ui/Avatar";
import BrandMark from "./ui/BrandMark";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfile, deleteProfile, removeProfilePhoto, isRemovingProfilePhoto } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file (PNG, JPG, GIF, WebP).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("That image is over 5 MB. Pick a smaller one.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => updateProfile({ profilePicture: reader.result });
    reader.readAsDataURL(file);
  };

  const handleToggleSound = () => {
    mouseClickSound.currentTime = 0;
    mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
    toggleSound();
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteProfile();
    }
  };

  return (
    <header className="safe-top border-b border-ink-600/60 px-4 pb-3 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <BrandMark size={26} withWordmark />
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="icon-btn"
            onClick={handleToggleSound}
            aria-pressed={isSoundEnabled}
            aria-label={isSoundEnabled ? "Turn sounds off" : "Turn sounds on"}
            title={isSoundEnabled ? "Sounds on" : "Sounds off"}
          >
            {isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />}
          </button>
          <button
            type="button"
            className="icon-btn hover:text-danger"
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOutIcon className="size-5" />
          </button>
          <button
            type="button"
            className="icon-btn hover:text-danger"
            onClick={handleDeleteProfile}
            aria-label="Delete account"
            title="Delete account"
          >
            <TrashIcon className="size-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUpdatingProfile}
          className="focus-ring group relative rounded-full disabled:cursor-wait"
          aria-label="Change profile photo"
          title="Change profile photo"
        >
          <Avatar src={authUser.profilePicture} name={authUser.fullName} size="lg" online />
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center rounded-full bg-ink-950/70 text-mist-100 transition-opacity ${
              isUpdatingProfile ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
            }`}
          >
            {isUpdatingProfile ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <CameraIcon className="size-5" />
            )}
          </span>
        </button>
        {authUser.profilePicture && (
          <button
            type="button"
            onClick={removeProfilePhoto}
            disabled={isRemovingProfilePhoto}
            className="absolute -bottom-1 -right-1 z-10 rounded-full bg-ink-800 p-1.5 text-mist-400 border border-ink-600 hover:bg-ink-700 hover:text-danger disabled:cursor-wait"
            title="Remove photo"
            aria-label="Remove photo"
          >
            {isRemovingProfilePhoto ? (
              <LoaderIcon className="size-3.5 animate-spin" />
            ) : (
              <TrashIcon className="size-3.5" />
            )}
          </button>
        )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          tabIndex={-1}
        />

        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold leading-tight text-mist-100">{authUser.fullName}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mist-500">
            <span className="size-1.5 rounded-full bg-live" aria-hidden="true" />
            Online
          </p>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
