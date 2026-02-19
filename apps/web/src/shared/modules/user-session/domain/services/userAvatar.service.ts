export const DEFAULT_USER_AVATAR_PATH = "/avatars/avatar_1.png";

class UserAvatarService {
  public resolveSrc(avatarUrl: string | null | undefined): string {
    if (!avatarUrl) {
      return DEFAULT_USER_AVATAR_PATH;
    }

    try {
      new URL(avatarUrl);
      return avatarUrl;
    } catch {
      if (avatarUrl.startsWith("/")) {
        return avatarUrl;
      }
      return DEFAULT_USER_AVATAR_PATH;
    }
  }

  public resolveFallback(name: string | null | undefined): string {
    const trimmedName = name?.trim() ?? "";
    if (!trimmedName) {
      return "?";
    }

    return trimmedName.charAt(0).toUpperCase();
  }
}

export const userAvatarService = new UserAvatarService();

export function getAvatarSrc(avatarUrl: string | null | undefined): string {
  return userAvatarService.resolveSrc(avatarUrl);
}
