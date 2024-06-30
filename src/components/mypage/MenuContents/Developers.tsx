import React, { useState } from 'react';
import Button from '../../common/UI/Button';
import { useBottomSheet } from '../../../hooks/useBottomSheet';

export default function Developers() {
   const { closeSheet } = useBottomSheet();
   const data = [
      {
         name: '이가은',
         major: '소프트웨어학과 21',
         part: 'FE',
      },
      {
         name: '차현민',
         major: '소프트웨어학과 19',
         part: 'BE',
      },
      {
         name: '김정우',
         major: '소프트웨어학과 19',
         part: 'BE',
      },
   ];
   return (
      <div className="p-3 flex flex-col gap-2 w-full">
         <h1 className="text-xl text-center">만든 사람들</h1>
         <div className="flex flex-col p-3 gap-3 w-full">
            {data.map(({ name, major, part }) => (
               <div key={name} className="p-5 shadow-md rounded-lg flex flex-col gap-1">
                  <p className="bg-zinc-200 px-3 rounded-md w-fit">{part}</p>
                  <p>{major}</p>
                  <p className="text-2xl">{name}</p>
               </div>
            ))}
         </div>
         <Button
            onClick={() => {
               closeSheet();
            }}
            value="닫기"
         />
      </div>
   );
}
