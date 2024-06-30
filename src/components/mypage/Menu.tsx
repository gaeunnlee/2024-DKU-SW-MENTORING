import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { FaArrowRightFromBracket, FaPowerOff, FaRankingStar } from 'react-icons/fa6';
import { FaKey, FaUserFriends } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { MdFeedback, MdLaptopChromebook } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import PasswordChange from './MenuContents/PasswordChange';
import NicknameChange from './MenuContents/NicknameChange';
import Feedback from './MenuContents/Feedback';
import Developers from './MenuContents/Developers';
import { IconType } from 'react-icons';
import { toast } from 'react-toastify';

interface IMenuButton {
   icon: IconType;
   name: string;
   onClick: () => void;
   isForUser: boolean;
   isForGuest?: boolean;
}

export default function Menu() {
   const { open } = useModal();
   const { logout } = useAuth();
   const { openSheet } = useBottomSheet();
   const navigate = useNavigate();
   const { isLoggedIn } = useAuth();

   const mypageMenu = [
      {
         icon: FaUserFriends,
         name: '팀 목록',
         onClick: () => {
            navigate('/teams');
         },
         isForUser: false,
      },
      {
         icon: FaRankingStar,
         name: '랭킹',
         onClick: () => {
            toast('⚠️ 행사 종료 후 공개 예정');
         },
         isForUser: false,
      },
      {
         icon: FaKey,
         name: '비밀번호',
         onClick: () => {
            openSheet({ content: <PasswordChange />, sheetName: 'password-sheet' });
         },
         isForUser: true,
      },
      {
         icon: AiFillEdit,
         name: '닉네임',
         onClick: () => {
            openSheet({ content: <NicknameChange />, sheetName: 'nickname-sheet' });
         },
         isForUser: true,
      },
      {
         icon: MdFeedback,
         name: '피드백',
         onClick: () => {
            openSheet({ content: <Feedback />, sheetName: 'feedback-sheet' });
         },
         isForUser: false,
      },
      {
         icon: MdLaptopChromebook,
         name: '제작',
         onClick: () => {
            openSheet({ content: <Developers />, sheetName: 'develop-sheet' });
         },
         isForUser: false,
      },
      {
         icon: FaPowerOff,
         name: '로그아웃',
         onClick: () => {
            logout();
         },
         isForUser: true,
      },
      {
         icon: FaArrowRightFromBracket,
         name: '로그인',
         onClick: () => {
            navigate('/login', { state: { afterLogout: false } });
         },
         isForUser: false,
         isForGuest: true,
      },
   ];
   const MenuButton = ({ item }: { item: IMenuButton }) => (
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
   );

   return (
      <Container>
         {mypageMenu.map((item, index) => {
            if (isLoggedIn || item.isForUser === false) {
               if (item.isForGuest !== true) {
                  return <MenuButton key={index} item={item} />;
               } else if (!isLoggedIn) {
                  return <MenuButton key={index} item={item} />;
               }
            }
         })}
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
