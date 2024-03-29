import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Props extends React.ComponentProps<'textarea'> {
   color?: string;
   setRef?: React.Dispatch<
      React.SetStateAction<
         MutableRefObject<null | HTMLTextAreaElement> | undefined
      >
   >;
}

export default function Textarea({ setRef, ...props }: Props) {
   const textareaRef = useRef(null);
   useEffect(() => {
      setRef !== undefined && setRef(textareaRef);
   }, [textareaRef]);

   return (
      <textarea
         ref={textareaRef}
         className="bg-[#f6f6f6] p-4 rounded-md text-[13px] leading-6"
         {...props}
      ></textarea>
   );
}
