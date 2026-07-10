import { create } from "zustand";

type PreferencesStore = {
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
};

export const usePreferencesStore = create<PreferencesStore>((set) => ({
    soundEnabled: true,

    setSoundEnabled: (enabled) =>
        set({
            soundEnabled: enabled,
        }),
}));