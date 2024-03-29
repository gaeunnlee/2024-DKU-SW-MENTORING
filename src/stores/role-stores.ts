import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RoleState {
   role: string;
   setRole: (state: string) => void;
}

export const useRoleStore = create(
   persist<RoleState>(
      (set) => ({
         role: '',
         setRole: (data: string) => {
            set({ role: data });
         },
      }),
      {
         name: 'role',
      }
   )
);
