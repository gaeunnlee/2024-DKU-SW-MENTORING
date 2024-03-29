import { create } from 'zustand';

interface NavState {
   isNavVisible: boolean;
   isPreviousVisible: boolean;
   setIsNavVisible: (state: boolean) => void;
   setIsPreviousVisible: (state: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
   isNavVisible: true,
   isPreviousVisible: false,
   setIsNavVisible: (state: boolean) => set({ isNavVisible: state }),
   setIsPreviousVisible: (state: boolean) => set({ isPreviousVisible: state }),
}));
