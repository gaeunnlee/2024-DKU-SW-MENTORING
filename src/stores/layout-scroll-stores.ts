import { create } from 'zustand';

interface LayoutScrollState {
   isScrollTop: boolean;
   setIsScrollTop: (state: boolean) => void;
}

export const useLayoutScrollStore = create<LayoutScrollState>((set) => ({
   isScrollTop: true,
   setIsScrollTop: (state: boolean) => set({ isScrollTop: state }),
}));
