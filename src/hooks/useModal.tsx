import React, { ReactNode, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/common/Modal/Modal';
import { ModalContext } from '../components/common/Modal/ModalProvider';

export const useModal = () => {
   const { setModalState } = useContext(ModalContext);

   const open = ({ type, content, confirmEvent }: { type: string; content: ReactNode; confirmEvent?: () => void }) => {
      setModalState({ isOpen: true, type, content, confirmEvent });
   };
   const close = () => {
      setModalState({ isOpen: false });
   };
   return { open, close };
};
