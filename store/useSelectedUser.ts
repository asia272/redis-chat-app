import { create } from "zustand";

export interface User {
    _id: string;
    firstName: string;
    lastName?: string;
    image: string;
    email: string;
}

type SelectedUserState = {
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
};

export const useSelectedUser = create<SelectedUserState>((set) => ({
    selectedUser: null,
    setSelectedUser: (user: User | null) => set({ selectedUser: user }),
}));