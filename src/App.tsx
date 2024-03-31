import React from 'react';
import Router from './Router';
import styled from 'styled-components';
import ModalProvider from './components/Modal/ModalProvider';
import BottomSheetProvider from './components/BottomSheet/BottomSheetProvider';

export default function App() {
   return (
      <BottomSheetProvider>
         <ModalProvider>
            <Wrapper>
               <Container>
                  <Router />
               </Container>
            </Wrapper>
         </ModalProvider>
      </BottomSheetProvider>
   );
}

const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   width: 100%;
   height: 100%;
   overflow: hidden;
   background-color: #f6f6f6;
   position: absolute;
   top: 0;
`;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   max-width: 480px;
   height: auto;
   background-color: #fff;
   position: absolute;
   min-height: 100dvh;
`;
