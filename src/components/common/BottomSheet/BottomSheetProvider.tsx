import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import { RefHandles } from 'react-spring-bottom-sheet/dist/types';
import { useSheetStore } from '../../../stores/sheet-stores';

export interface ISheetState {
   content?: ReactNode;
   sheetName?: string;
}

const bottomSheetRoot = document.getElementById('bottom-sheet-root') as HTMLElement;

export const SheetContext = React.createContext({
   setSheetState: ({ content }: ISheetState) => {
      null;
   },
});

export default function BottomSheetProvider({ children }: { children: ReactNode }) {
   const [sheetState, setSheetState] = useState<ISheetState>();
   const sheetRef = useRef<BottomSheetRef>(null);
   const { isSheetOpen, setIsSheetOpen } = useSheetStore();

   return (
      <SheetContext.Provider value={{ setSheetState }}>
         {children}
         {isSheetOpen &&
            ReactDOM.createPortal(
               <BottomSheet
                  open={isSheetOpen}
                  scrollLocking={false}
                  expandOnContentDrag={true}
                  ref={sheetRef}
                  className={`bottom-sheet ${sheetState?.sheetName}`}
                  snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.95, maxHeight * 0.95]}
                  onDismiss={() => {
                     setIsSheetOpen(false);
                  }}
               >
                  {sheetState?.content}
               </BottomSheet>,
               bottomSheetRoot
            )}
      </SheetContext.Provider>
   );
}
