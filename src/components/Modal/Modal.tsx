import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';

export default function Modal({
   type,
   content,
   confirmEvent,
}: {
   type?: string;
   content?: ReactNode;
   confirmEvent?: () => void;
}) {
   const { close } = useModal();

   return (
      <>
         <Overlay
            className={type}
            onClick={() => {
               type === 'error' || close();
            }}
         >
            <Container
               onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
               }}
            >
               <Content>{content}</Content>
               <ButtonContainer isMultiple={type === 'question'}>
                  {type === 'question' && (
                     <Button
                        onClick={() => {
                           close();
                        }}
                        value="취소"
                     />
                  )}
                  <Button
                     onClick={() => {
                        type === 'question' && confirmEvent !== undefined
                           ? confirmEvent()
                           : close();
                     }}
                     value="확인"
                  />
               </ButtonContainer>
            </Container>
         </Overlay>
      </>
   );
}

const Overlay = styled.div`
   position: fixed;
   background-color: #00000050;
   justify-self: center;
   width: 100vw;
   max-width: 480px;
   height: 100dvh;
   height: -webkit-fill-available;
   height: fill-available;
   z-index: 999;
   display: flex;
   top: 0;
   &.error,
   &.question {
      justify-content: center;
      align-items: center;
   }
   &.bottom {
      justify-content: center;
      align-items: flex-end;
   }
`;
const Container = styled.div`
   height: fit-content;
   box-sizing: border-box;
   border-radius: 10px;
   background-color: #fff;
   display: flex;
   flex-direction: column;
   gap: 10px;
   .full > & {
      height: 100dvh;
      width: 100vw;
      justify-content: space-between;
   }
   .error > &,
   .question > & {
      width: 90vw;
      max-width: 450px;
      margin-top: -20vh;
      padding-top: 20px;
   }
   .bottom > & {
      width: 100vw;
      max-width: 480px;
      min-height: 30dvh;
      border-radius: 10px 10px 0 0;
      justify-content: space-between;
   }

   &:has(div > .isParentFullHeight) {
      height: 92dvh;
   }
`;
const Content = styled.div`
   display: flex;
   padding: 10px;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 10px;
`;
const ButtonContainer = styled.div<{ isMultiple?: boolean }>`
   display: flex;
   & > input {
      width: ${(props) => (props.isMultiple ? '50%' : '100%')};
   }
`;
const Button = styled.input.attrs(() => ({
   type: 'submit',
}))`
   padding: 10px;
   font-size: 1.1rem;
   margin: 15px;
   cursor: pointer;
`;
