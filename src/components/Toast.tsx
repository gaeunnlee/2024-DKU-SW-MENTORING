import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useToastStore } from '../stores/toast-stores';
import { Bounce, ToastContainer, toast } from 'react-toastify';

export interface IToastState {
   content?: ReactNode;
   toastName?: string;
}

const toastRoot = document.getElementById('toast-root') as HTMLElement;

export const ToastContext = React.createContext({
   setToastState: ({ content }: IToastState) => {
      null;
   },
});

export default function ToastProvider({ children }: { children: ReactNode }) {
   const [toastState, setToastState] = useState<IToastState>();
   const { isToastShow, toastContent, setIsToastShow } = useToastStore();
   useEffect(() => {
      if (isToastShow) {
         toast(toastContent, {
            position: 'bottom-center',
            autoClose: 2000,
            style: { marginBottom: '50px' },
            hideProgressBar: true,
            closeOnClick: true,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
         });
         setTimeout(() => {
            setIsToastShow(false, '');
         }, 2000);
      }
   }, [isToastShow]);
   return (
      <ToastContext.Provider value={{ setToastState }}>
         {children}
         {isToastShow && ReactDOM.createPortal(<ToastContainer />, toastRoot)}
      </ToastContext.Provider>
   );
}
