import React, { useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { route } from '../data/route';
import { useEffect, useState } from 'react';
import { useNavStore } from '../stores/nav-stores';

export default function TopBar() {
   const { pathname } = useLocation();
   const [title, setTitle] = useState('');
   const { isNavVisible, setIsNavVisible } = useNavStore();

   useEffect(() => {
      setTitle(
         Object.getOwnPropertyDescriptor(route, pathname.split('/')[1])?.value
            .id ?? ''
      );
      setIsNavVisible(true);
   }, [pathname]);

   return (
      <Container className={`${!isNavVisible && 'hidden'}`}>
         {pathname === '/' ? <LogoTitle>結</LogoTitle> : <>{title}</>}
      </Container>
   );
}
const Container = styled.nav`
   padding: 0 10px;
   box-sizing: border-box;
   display: flex;
   height: 50px;
   width: 100%;
   justify-content: center;
   align-items: center;
   font-weight: 800;
   transition: 0.2s;
   opacity: 1;
   box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.15);
   &.hidden {
      height: 0;
      opacity: 0;
      transition: 0.2s;
   }
`;

const Logo = styled.img<{ src: string }>`
   width: 40px;
   height: 40px;
   background-size: cover;
   background-image: url(${(props) => props.src});
   border-radius: 100%;
`;

const LogoTitle = styled.p`
   font-weight: 400;
   font-style: normal;
   font-size: 20px;
`;
