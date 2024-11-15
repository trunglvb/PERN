import { IUser } from '@/types/user.type';
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from '@/utils/utils';
import { create } from 'zustand';

type State = {
  isAuthenticated: boolean;
  profile: IUser | null;
};

type Action = {
  setIsAuthenticated: (value: boolean) => void;
  setProfile: (profile: IUser) => void;
  resetUserState: () => void;
};

const useUserStore = create<State & Action>((set, _get) => ({
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  profile: getProfileFromLocalStorage(),
  setIsAuthenticated: (value: boolean) => set(() => ({ isAuthenticated: value })),
  setProfile: (profile: IUser) => set(() => ({ profile: profile })),
  resetUserState: () => set(() => ({ isAuthenticated: false, profile: null }))
}));

export default useUserStore;
