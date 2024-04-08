import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IMission, IPost } from '../data/interface';
import { HiUserCircle } from 'react-icons/hi';
import Carousel from './Carousel/Carousel';
import { getMission } from '../utils/getMission';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Comment from './Comment';
import { useRoleStore } from '../stores/role-stores';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { ButtonNameByMissionStatus, TagInfoByMissionStatus } from '../data/missionStatus';
import { TMissionStatus } from '../data/type';
import { useModal } from '../hooks/useModal';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from '../stores/toast-stores';

const Container = styled.div`
   display: flex;
   flex-direction: column;
`;

export default function Post({ data }: { data: IPost }) {
   const [missionName, setMissionName] = useState('');
   const [openBottomSheet, setOpenBottomSheet] = useState(false);
   const sheetRef = useRef<BottomSheetRef>(null);
   const { isAdmin } = useRoleStore();
   const { patch, axiosDelete } = useApi();
   const { isLoggedIn } = useAuth();
   const { open, close } = useModal();
   const navigate = useNavigate();
   const { setIsToastShow } = useToastStore();
   const { pathname } = useLocation();

   useEffect(() => {
      getMission(data.missionId).then(function (data: IMission) {
         setMissionName(data.name);
      });
   }, []);

   const handleDismiss = () => {
      setOpenBottomSheet(false);
   };

   const handleMissionByAdmin = ({
      eventTarget,
      missionId,
   }: {
      eventTarget: EventTarget & HTMLButtonElement;
      missionId: number;
   }) => {
      const handleAcceptance = (method: string) => {
         let score = null;
         const patchAcceptance = () => {
            patch({ api: `/${method}/mission/${missionId}`, auth: true }).then((response) => {
               eventTarget.innerHTML = method === 'cancel' ? '거부 처리' : '승인 취소';
               alert('정상적으로 처리되었습니다');
            });
         };
         if (method === 'accept') {
            score = prompt('연합 추가 점수만 입력해주세요 (없으면 입력 X)', '');
            if (score !== null) {
               patchAcceptance();
            }
         } else {
            if (confirm('인증 글을 거부 처리하시겠습니까?')) {
               patchAcceptance();
            }
         }
      };
      switch (eventTarget.innerHTML) {
         case '거부 처리':
            alert('거부 처리한 게시물입니다');
            break;
         case '승인':
            handleAcceptance('accept');
            break;
         case '승인 취소':
            handleAcceptance('cancel');
            break;
      }
   };

   const MissionStatusTag = ({ status }: { status: TMissionStatus }) => (
      <span
         className={`whitespace-nowrap py-[0.1rem] px-[0.4rem] rounded-md text-sm ${TagInfoByMissionStatus[status].color}`}
      >
         {TagInfoByMissionStatus[status].name}
      </span>
   );

   const BonusStatusTag = () => (
      <span className="whitespace-nowrap py-[0.1rem] px-[0.4rem] rounded-md text-sm bg-blue-200">보너스</span>
   );

   const deletePost = async (id: number) => {
      await axiosDelete({ api: `/post/mission-board/${id}`, auth: true })
         .then((response) => {
            setIsToastShow(true, '⚒️ 삭제 완료');
         })
         .catch((e: AxiosError) => {
            console.log(e);
         });
   };

   return (
      <Container>
         <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 w-full">
               <HiUserCircle style={{ fontSize: '40px', color: '#ddd' }} />
               <div className="flex flex-col w-full">
                  <p className="leading-0 text-[0.9rem]">{data.author}</p>
                  <div className="flex justify-between w-full">
                     <div className="leading-0 text-slate-800 flex gap-1 items-center justify-between w-full">
                        <span className="whitespace-nowrap w-[220px] text-ellipsis overflow-hidden">{missionName}</span>
                        <div className="flex gap-1">
                           {data.bonusMissionSuccessful && <BonusStatusTag />}
                           <MissionStatusTag status={data.registerStatus} />
                           {pathname === '/my-posts' && (
                              <button
                                 onClick={() => {
                                    open({
                                       content: <>삭제하시겠습니까?</>,
                                       confirmEvent: () => {
                                          deletePost(data.id);
                                          close();
                                       },
                                       type: 'question',
                                    });
                                 }}
                                 className="py-[0.1rem] px-[0.4rem] rounded-md bg-red-100 text-sm whitespace-nowrap"
                              >
                                 삭제
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <Carousel data={data.images} />
            <AdminButtonContainer className="flex w-full justify-end">
               {isAdmin && (
                  <AdminButton
                     onClick={(e) => {
                        handleMissionByAdmin({
                           eventTarget: e.currentTarget,
                           missionId: data.id,
                        });
                     }}
                  >
                     {ButtonNameByMissionStatus[data.registerStatus]}
                  </AdminButton>
               )}
            </AdminButtonContainer>
         </div>
         <div className="flex flex-col gap-1 mt-5 ml-2">
            <div className="flex gap-2">
               <span className="text-blue-700">#{data.title}</span>{' '}
            </div>
            <p>{data.body}</p>
            <div
               className="flex gap-1 text-zinc-500 cursor-pointer"
               onClick={() => {
                  isLoggedIn
                     ? setOpenBottomSheet(true)
                     : open({ type: 'error', content: <>로그인 이후 이용 가능합니다.</> });
               }}
            >
               댓글 {data.commentCount}개 보기
               <BottomSheet
                  open={openBottomSheet}
                  scrollLocking={true}
                  expandOnContentDrag={true}
                  ref={sheetRef}
                  className="bottomSheet"
                  snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.95, maxHeight * 0.95]}
                  onDismiss={handleDismiss}
               >
                  <Comment postId={data.id} />
               </BottomSheet>
            </div>
         </div>
      </Container>
   );
}
const AdminButtonContainer = styled.div`
   position: sticky;
   margin-top: -30px;
   margin-left: -5px;
   z-index: 3;
`;
const AdminButton = styled.button`
   background-color: black;
   color: white;
   border-radius: 5px;
   white-space: nowrap;
   padding: 5px;
`;
