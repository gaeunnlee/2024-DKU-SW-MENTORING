import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
   const isLoggedIn = (() => !!localStorage.getItem('accessToken'))();
   const navigate = useNavigate();

   const logout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      navigate('/login');
   };

   return {
      isLoggedIn,
      logout,
   };
};
