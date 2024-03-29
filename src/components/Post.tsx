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

const Container = styled.div`
   display: flex;
   flex-direction: column;
`;

export default function Post({ data }: { data: IPost }) {
   const [missionName, setMissionName] = useState('');
   const [openBottomSheet, setOpenBottomSheet] = useState(false);
   const sheetRef = useRef<BottomSheetRef>(null);
   const { isAdmin } = useRoleStore();
   const { patch } = useApi();

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
            score = prompt('보너스 점수만 입력해주세요 (없으면 입력 X)', '');
            if (score !== null) {
               console.log(score);
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
      <span className={`py-[0.1rem] px-[0.4rem] rounded-md text-sm ${TagInfoByMissionStatus[status].color}`}>
         {TagInfoByMissionStatus[status].name}
      </span>
   );

   return (
      <Container>
         <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 ">
               <HiUserCircle style={{ fontSize: '40px', color: '#ddd' }} />
               <div className="flex flex-col">
                  <p className="leading-0 text-[0.9rem]">{data.author}</p>

                  <p className="leading-0 text-slate-800 flex gap-1 items-center">
                     {missionName}
                     <MissionStatusTag status={data.registerStatus} />
                  </p>
               </div>
            </div>
            {isAdmin && (
               <button
                  onClick={(e) => {
                     handleMissionByAdmin({
                        eventTarget: e.currentTarget,
                        missionId: data.id,
                     });
                  }}
                  className="p-2 bg-black text-white rounded-md"
               >
                  {ButtonNameByMissionStatus[data.registerStatus]}
               </button>
            )}
         </div>
         <div>
            <Carousel data={data.images} />
         </div>
         <div className="flex flex-col gap-1 mt-5 ml-2">
            <div className="flex gap-2">
               <span className="text-blue-700">#{data.title}</span>{' '}
            </div>
            <p>{data.body}</p>
            <div
               className="flex gap-1 text-zinc-500 cursor-pointer"
               onClick={() => {
                  setOpenBottomSheet(true);
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
