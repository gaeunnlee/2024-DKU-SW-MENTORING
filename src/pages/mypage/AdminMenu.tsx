import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { FaPowerOff } from 'react-icons/fa6';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFactCheck } from 'react-icons/md';

export default function AdminMenu() {
   const { open } = useModal();
   const { logout } = useAuth();
   const navigate = useNavigate();

   const mypageMenu = [
      {
         icon: MdOutlineFactCheck,
         name: '미승인',
         onClick: () => {
            navigate('/unapproved-missions');
         },
      },
      {
         icon: FaPowerOff,
         name: '로그아웃',
         onClick: () => {
            logout();
         },
      },
   ];

   return (
      <Container>
         {mypageMenu.map((item) => (
            <Button
               key={item.name}
               onClick={() => {
                  item.onClick !== undefined ? item.onClick() : open({ type: 'error', content: <>🚧 개발 중 🚧</> });
               }}
            >
               <Icon>
                  <item.icon />
               </Icon>
               <p className="whitespace-nowrap">{item.name}</p>
            </Button>
         ))}
      </Container>
   );
}

const Container = styled.div`
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   align-items: center;
   justify-items: center;
`;

const Button = styled.button`
   padding: 0.5rem;
   border-radius: 5px;
   width: fit-content;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 0.3rem;
   p {
      font-size: 0.9rem;
   }
`;

const Icon = styled.div`
   width: fit-content;
   box-shadow: 1px 1px 1px 1px #88888880;
   padding: 0.7rem;
   border-radius: 10px;
   font-size: 1.5rem;
`;
