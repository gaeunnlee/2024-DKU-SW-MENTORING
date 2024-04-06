import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
   color?: string;
   className?: string;
}

export default function Input({ className, ...props }: InputProps) {
   return <input className={`bg-[#f6f6f6] p-4 rounded-md text-[13px] ${className}`} {...props} />;
}
