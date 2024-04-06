import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { useBottomSheet } from '../../hooks/useBottomSheet';

export default function Feedback() {
   const { closeSheet } = useBottomSheet();

   return (
      <div className="p-3 flex flex-col gap-2">
         <h1 className="text-xl text-center">피드백</h1>
         <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeVRULmb2L9G3uQqntsKJtzZM1HGB6ahjXrin8mLY6xYXL33g/viewform?embedded=true"
            width="100%"
            style={{ height: '80dvh' }}
         >
            로드 중…
         </iframe>
         <Button
            onClick={() => {
               closeSheet();
            }}
            value="닫기"
         />
      </div>
   );
}
