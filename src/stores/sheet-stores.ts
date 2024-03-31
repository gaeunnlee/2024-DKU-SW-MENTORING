import { create } from 'zustand';

interface SheetState {
   isSheetOpen: boolean;
   setIsSheetOpen: (state: boolean) => void;
}

export const useSheetStore = create<SheetState>((set) => ({
   isSheetOpen: false,
   setIsSheetOpen: (state: boolean) => set({ isSheetOpen: state }),
}));
