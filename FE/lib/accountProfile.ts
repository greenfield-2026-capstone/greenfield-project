export type AccountProfile = {
  name: string;
  email: string;
  displayEmail?: string;
  photo?: string;
};

function profileKey(email: string) {
  return "histour-profile:" + email;
}

export function readAccountProfile(): AccountProfile | null {
  try {
    const account = JSON.parse(localStorage.getItem("histour-account") ?? "null");
    if (typeof account?.email !== "string" || !account.email) return null;
    let profile;
    try {
      profile = JSON.parse(localStorage.getItem(profileKey(account.email)) ?? "null");
    } catch {
      // Keep showing the account details if the saved profile is unreadable.
    }
    return {
      email: account.email,
      name: profile?.name ?? account.name ?? "",
      displayEmail: profile?.displayEmail,
      photo: profile?.photo ?? (profile ? undefined : account.avatar_url || account.profileImage || account.image),
    };
  } catch {
    return null;
  }
}

export function saveAccountProfile({ email, name, displayEmail, photo }: AccountProfile) {
  if (readAccountProfile()?.email !== email) return false;
  try {
    localStorage.setItem(profileKey(email), JSON.stringify({ name, displayEmail, photo }));
    window.dispatchEvent(new Event("histour-profile-changed"));
    return true;
  } catch {
    return false;
  }
}
