import { create } from 'zustand';

interface UserSettingsState {
  displayName: string;
  setDisplayName: (name: string) => void;
}

export const useUserSettingsStore = create<UserSettingsState>((set) => ({
  displayName: '',
  setDisplayName: (name) => set({ displayName: name }),
})); 