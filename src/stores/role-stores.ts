import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RoleState {
   role: string;
   isAdmin: boolean;
   setRole: (state: string) => void;
   setIsAdmin: (state: boolean) => void;
}

export const useRoleStore = create(
   persist<RoleState>(
      (set) => ({
         role: '',
         isAdmin: false,
         setRole: (data: string) => {
            set({ role: data });
         },
         setIsAdmin: (data: boolean) => {
            set({ isAdmin: data });
         },
      }),
      {
         name: 'role',
      }
   )
);
