import React, { ReactNode } from 'react';

export default function FloatingButton({ event, children }: { event: () => void; children: ReactNode }) {
   return (
      <div className="flex justify-end">
         <button
            onClick={() => {
               event();
            }}
            className="rounded-full fixed bottom-[80px] mr-5 bg-black w-[70px] h-[70px] flex justify-center items-center"
         >
            {children}
         </button>
      </div>
   );
}
