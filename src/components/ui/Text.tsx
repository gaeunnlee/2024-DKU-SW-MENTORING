import React from 'react';

interface TextProps extends React.ComponentProps<'p'> {
   type?: 'default' | 'strong';
}

export default function Text({
   children,
   className,
   type,
   ...props
}: TextProps) {
   const textType = {
      default: 'text-[13px]',
   };
   return (
      <p className={`${className}`} {...props}>
         {children}
      </p>
   );
}
