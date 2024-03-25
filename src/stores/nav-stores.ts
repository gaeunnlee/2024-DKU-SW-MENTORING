import { create } from 'zustand';

interface NavState {
   isNavVisible: boolean;
   setIsNavVisible: (state: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
   isNavVisible: true,
   setIsNavVisible: (state: boolean) => set({ isNavVisible: state }),
}));
