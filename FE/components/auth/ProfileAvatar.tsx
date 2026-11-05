import type { AccountProfile } from "@/lib/accountProfile";

export function ProfileAvatar({ profile, size }: { profile: AccountProfile; size: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#8d3f35] font-black text-white ${size}`}>
      {profile.photo ? <img src={profile.photo} alt="" className="absolute inset-0 h-full w-full object-cover" /> :
        (profile.name.trim() || profile.email).charAt(0).toUpperCase()}
    </span>
  );
}
