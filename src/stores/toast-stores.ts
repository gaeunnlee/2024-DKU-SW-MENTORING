import { create } from 'zustand';

interface ToastState {
   isToastShow: boolean;
   toastContent: string;
   duration: number | undefined | false;
   setIsToastShow: (isToastShow: boolean, toastContent: string, duration?: number | undefined | false) => void;
}

export const useToastStore = create<ToastState>((set) => ({
   isToastShow: false,
   toastContent: '',
   duration: undefined,
   setIsToastShow: (isToastShow, toastContent, duration) =>
      set({ isToastShow: isToastShow, toastContent: toastContent, duration: duration }),
}));
