import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { FaPowerOff, FaRankingStar } from 'react-icons/fa6';
import { FaKey, FaUserFriends } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { MdFeedback, MdLaptopChromebook } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import PasswordChange from './PasswordChange';
import NicknameChange from './NicknameChange';
import { useToastStore } from '../../stores/toast-stores';
import Feedback from './Feedback';
import Developers from './Developers';

export default function Menu() {
   const { open } = useModal();
   const { logout } = useAuth();
   const { openSheet } = useBottomSheet();
   const navigate = useNavigate();
   const { setIsToastShow } = useToastStore();

   const mypageMenu = [
      {
         icon: FaUserFriends,
         name: '팀 목록',
         onClick: () => {
            navigate('/teams');
         },
      },
      {
         icon: FaRankingStar,
         name: '랭킹',
         onClick: () => {
            setIsToastShow(true, '⚠️ 행사 종료 후 공개 예정');
         },
      },
      {
         icon: FaKey,
         name: '비밀번호',
         onClick: () => {
            openSheet({ content: <PasswordChange />, sheetName: 'password-sheet' });
         },
      },
      {
         icon: AiFillEdit,
         name: '닉네임',
         onClick: () => {
            openSheet({ content: <NicknameChange />, sheetName: 'nickname-sheet' });
         },
      },
      {
         icon: MdFeedback,
         name: '피드백',
         onClick: () => {
            openSheet({ content: <Feedback />, sheetName: 'feedback-sheet' });
         },
      },
      {
         icon: MdLaptopChromebook,
         name: '제작',
         onClick: () => {
            openSheet({ content: <Developers />, sheetName: 'develop-sheet' });
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
