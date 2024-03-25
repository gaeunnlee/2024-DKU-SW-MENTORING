import React, { ReactNode } from 'react';
import { useAuth } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: ReactNode }) {
   const { isLoggedIn } = useAuth();

   return isLoggedIn ? (
      <>{children}</>
   ) : (
      <Navigate to={'/login'} replace={true} />
   );
}
