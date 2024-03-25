import React from 'react';

interface ButtonProps extends React.ComponentProps<'input'> {
   color?: string;
   className?: string;
}

export default function Button({ className, ...props }: ButtonProps) {
   return (
      <input
         type="submit"
         className={`p-4 rounded-md text-[13px] cursor-pointer bg-zinc-700 text-white ${className}`}
         {...props}
      />
   );
}
