import React from 'react';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

export default function ArrowButton({
   type,
   index,
   setIndex,
   length,
}: {
   type: 'previous' | 'next';
   index: number;
   setIndex: React.Dispatch<React.SetStateAction<number>>;
   length: number;
}) {
   const ArrowIcon =
      type === 'next' ? (
         <FaChevronCircleRight className="drop-shadow-md hover:text-black cursor-pointer" />
      ) : (
         <FaChevronCircleLeft className="drop-shadow-md hover:text-black cursor-pointer" />
      );

   const prevIndex = () => {
      length - 1 !== index && setIndex((prev) => prev + 1);
   };

   const nextIndex = () => {
      index !== 0 && setIndex((prev) => prev - 1);
   };

   return (
      <div
         className={`flex h-full items-center text-white text-xl  absolute ${
            type === 'next' ? 'right-5' : 'left-5'
         }`}
         onClick={() => {
            {
               type === 'next' ? prevIndex() : nextIndex();
            }
         }}
      >
         {ArrowIcon}
      </div>
   );
}
