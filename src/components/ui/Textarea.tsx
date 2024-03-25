import React from 'react';

interface Props extends React.ComponentProps<'textarea'> {
   color?: string;
}

export default function Textarea({ ...props }: Props) {
   return (
      <textarea
         className="bg-[#f6f6f6] p-4 rounded-md text-[13px] leading-6"
         {...props}
      ></textarea>
   );
}
