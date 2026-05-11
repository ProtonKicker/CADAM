import { Profile } from '@shared/types';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_PROFILE: Profile = {
  id: 'local-profile',
  user_id: 'local-user',
  full_name: 'Local User',
  avatar_path: null,
  notifications_enabled: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function useProfile() {
  return useQuery({
    queryKey: ['profile', 'local'],
    queryFn: async () => {
      return DEFAULT_PROFILE;
    },
    enabled: true,
    staleTime: Infinity,
    initialData: DEFAULT_PROFILE,
  });
}

export function useAvatarUrl(_avatarPath: string | null | undefined) {
  return useQuery({
    queryKey: ['avatar-url', _avatarPath],
    queryFn: async () => null,
    enabled: false,
  });
}

export function useUpdateProfile() {
  return {
    mutateAsync: async () => {},
    mutate: () => {},
  } as unknown as ReturnType<typeof import('@tanstack/react-query').useMutation>;
}

export function useUploadAvatar() {
  return {
    mutateAsync: async () => {},
    mutate: () => {},
  } as unknown as ReturnType<typeof import('@tanstack/react-query').useMutation>;
}
