import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoleStore } from '../stores/role-stores';

export const useAuth = () => {
   const isLoggedIn = (() => !!localStorage.getItem('accessToken'))();
   const navigate = useNavigate();
   const { setIsAdmin } = useRoleStore();

   const logout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAdmin(false);
      navigate('/login', { state: { afterLogout: true } });
   };

   return {
      isLoggedIn,
      logout,
   };
};
