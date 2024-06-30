import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IBox extends React.HTMLAttributes<HTMLDivElement> {
   children: ReactNode;
   color?: string;
   shadow?: boolean;
   className?: string;
}

const Container = styled.div<{ shadow?: boolean }>`
   display: flex;
   box-sizing: border-box;
   border-radius: 10px;
   padding: 10px;
   box-shadow: 0px 8px 9px 3px rgba(0, 0, 0, 0.05);
   -webkit-box-shadow: 0px 8px 9px 3px rgba(0, 0, 0, 0.05);
   -moz-box-shadow: 0px 8px 9px 3px rgba(0, 0, 0, 0.05);
   color: #333;
   ${(props) =>
      props.shadow === false
         ? 'box-shadow: none; -webkit-box-shadow: none; -moz-box-shadow: none;'
         : ''}
`;

export default function Box({
   children,
   color,
   className,
   shadow,
   ...props
}: IBox) {
   return (
      <Container
         {...props}
         shadow={shadow}
         className={`${className} ${color ? `bg-[${color}]` : 'bg-[#fff]'}`}
      >
         {children}
      </Container>
   );
}
