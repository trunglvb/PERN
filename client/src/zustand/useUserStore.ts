import { IUser } from '@/types/user.type';
import { getAccessTokenFromLocalStorage } from '@/utils/utils';
import { create } from 'zustand';

type State = {
  isAuthenticated: boolean;
  profile: IUser | null;
};

type Action = {
  setIsAuthenticated: (value: boolean) => void;
  setProfile: (profile: IUser) => void;
};

const useUserStore = create<State & Action>((set, _get) => ({
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  profile: null,
  setIsAuthenticated: (value: boolean) => set(() => ({ isAuthenticated: value })),
  setProfile: (profile: IUser) => set(() => ({ profile: profile }))
}));

export default useUserStore;
