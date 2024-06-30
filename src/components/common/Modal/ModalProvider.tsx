import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

export interface IModalState {
   isOpen: boolean;
   type?: string;
   content?: ReactNode;
   confirmEvent?: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export const ModalContext = React.createContext({
   setModalState: ({ isOpen, type, content, confirmEvent }: IModalState) => {
      console.warn(type, content);
   },
});

function ModalProvider({ children }: { children: ReactNode }) {
   const [modalState, setModalState] = useState<IModalState>();

   return (
      <ModalContext.Provider value={{ setModalState }}>
         {children}
         {modalState?.isOpen &&
            ReactDOM.createPortal(
               <Modal
                  type={modalState?.type ?? 'error'}
                  content={modalState.content}
                  confirmEvent={modalState.confirmEvent}
               />,
               modalRoot
            )}
      </ModalContext.Provider>
   );
}

export default ModalProvider;
