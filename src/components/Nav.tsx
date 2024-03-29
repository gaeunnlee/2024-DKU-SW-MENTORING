import React from 'react';
import styled from 'styled-components';
import { GoHome, GoPerson, GoTasklist } from 'react-icons/go';
import { VscDiffAdded } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';

const Container = styled.nav`
   position: absolute;
   bottom: 0;
   bottom: env(safe-area-inset-bottom);
   background-color: #fff;
   width: 100%;
   height: 60px;
   -webkit-box-shadow: 0px -4px 6px 1px rgba(0, 0, 0, 0.11);
   -moz-box-shadow: 0px -4px 6px 1px rgba(0, 0, 0, 0.11);
   box-shadow: 0px -4px 6px 1px rgba(0, 0, 0, 0.11);
   border-radius: 10px 10px 0 0;
   display: flex;
   justify-content: space-around;
   align-items: center;
   font-size: 30px;
   color: #a1a1a1;
   z-index: 2;
`;

const NavItem = styled(Link)<{ color: string }>`
   color: ${(props) => props.color};
`;

export default function Nav() {
   const { pathname } = useLocation();

   return (
      <Container>
         {navItems.map(({ id, icon }) => (
            <NavItem
               to={id}
               key={id}
               color={pathname === id ? '#000' : 'default'}
            >
               {icon}
            </NavItem>
         ))}
      </Container>
   );
}

const navItems = [
   {
      id: '/',
      icon: <GoHome />,
   },
   {
      id: '/missions',
      icon: <GoTasklist />,
   },
   {
      id: '/upload',
      icon: <VscDiffAdded />,
   },
   {
      id: '/notice',
      icon: <IoNotificationsOutline />,
   },
   {
      id: '/mypage',
      icon: <GoPerson />,
   },
];
