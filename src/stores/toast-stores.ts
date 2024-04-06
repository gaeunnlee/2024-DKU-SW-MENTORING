import { create } from 'zustand';

interface ToastState {
   isToastShow: boolean;
   toastContent: string;
   setIsToastShow: (state: boolean, toastContent: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
   isToastShow: false,
   toastContent: '',
   setIsToastShow: (state: boolean, toastContent: string) => set({ isToastShow: state, toastContent: toastContent }),
}));
