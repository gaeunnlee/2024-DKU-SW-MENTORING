import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { route } from '../data/route';
import { useEffect, useState } from 'react';
import { useNavStore } from '../stores/nav-stores';
import LogoImage from '../assets/images/logo.png';
import { IoChevronBack } from 'react-icons/io5';

export default function TopBar() {
   const { pathname } = useLocation();
   const [title, setTitle] = useState('');
   const { isNavVisible, setIsNavVisible, isPreviousVisible, setIsPreviousVisible } = useNavStore();
   const navigate = useNavigate();

   useEffect(() => {
      setTitle(Object.getOwnPropertyDescriptor(route, pathname.split('/')[1])?.value.id ?? '');
      setIsNavVisible(true);
      setIsPreviousVisible(false);
   }, [pathname]);

   return (
      <Container className={`${!isNavVisible && 'hidden'}`}>
         {isPreviousVisible && (
            <IoChevronBack
               onClick={() => {
                  navigate(-1);
               }}
            />
         )}
         {pathname === '/' ? <Logo src={LogoImage} /> : <>{title}</>}
      </Container>
   );
}
const Container = styled.nav`
   position: fixed;
   background-color: #fff;
   z-index: 2;
   top: 0;
   padding: 0 10px;
   box-sizing: border-box;
   display: flex;
   height: 50px;
   width: 100%;
   max-width: 480px;
   justify-content: center;
   align-items: center;
   font-weight: 800;
   transition: 0.2s;
   opacity: 1;
   box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.15);
   overflow: hidden;
   &.hidden {
      height: 0;
      opacity: 0;
      transition: 0.2s;
   }
   svg {
      font-size: 1.5rem;
      position: absolute;
      left: 1.25rem;
      cursor: pointer;
   }
`;

const Logo = styled.img<{ src: string }>`
   width: 60px;
   height: 60px;
   background-size: cover;
   background-image: url(${(props) => props.src});
`;

const LogoTitle = styled.p`
   font-weight: 400;
   font-style: normal;
   font-size: 20px;
`;
