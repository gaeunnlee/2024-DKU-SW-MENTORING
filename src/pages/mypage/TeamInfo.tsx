import React, { useRef, useState } from 'react';
import { IMyTeam } from '../../data/interface';
import { ReactComponent as ScoreIcon } from '../../assets/svg/target-dynamic-color.svg';
import { ReactComponent as SuccessIcon } from '../../assets/svg/thumb-up-dynamic-color.svg';
import { ReactComponent as MissionIcon } from '../../assets/svg/folder-dynamic-color.svg';
import { useNavigate } from 'react-router-dom';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import MissionCompleted from './MissionCompleted';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export default function TeamInfo({ data }: { data?: IMyTeam }) {
   const navigate = useNavigate();
   const [openBottomSheet, setOpenBottomSheet] = useState(false);
   const sheetRef = useRef<BottomSheetRef>(null);
   const { isLoggedIn } = useAuth();

   const infoBoxData = [
      {
         icon: <ScoreIcon width="100%" height="50" />,
         content: (
            <p>
               점수
               <br />
               <span className="text-lg">{data?.score}점</span>
            </p>
         ),
         event: () => {
            null;
         },
      },
      {
         icon: <MissionIcon width="100%" height="50" />,
         content: (
            <p>
               <span className="text-lg">작성글</span>
               <br />
               보러가기
            </p>
         ),
         event: () => {
            isLoggedIn ? navigate('/my-posts') : toast('🥲 로그인 이후 이용 가능합니다');
         },
      },
      {
         icon: <SuccessIcon width="100%" height="50" />,
         content: (
            <p>
               <span className="text-lg">성공미션</span>
               <br />
               확인하기
            </p>
         ),
         event: () => {
            isLoggedIn ? setOpenBottomSheet(true) : toast('🥲 로그인 이후 이용 가능합니다');
         },
      },
   ];
   return (
      <div className="bg-[rgb(249,249,249)] px-5 py-3 rounded-lg flex flex-col gap-2">
         {isLoggedIn && (
            <>
               <p className="text-lg leading-none bg-zinc-500 w-fit text-white px-2 py-1 rounded-lg">
                  {data?.teamName}
               </p>

               <div className="flex items-end gap-2 mb-2">
                  <span className="text-lg leading-none">{data?.mentor}</span>
                  {data?.members.map((name) => (
                     <span key={name} className="leading-none">
                        {name}
                     </span>
                  ))}
               </div>
            </>
         )}
         <div className="flex gap-9 w-full">
            {infoBoxData.map(({ icon, content, event }, index) => (
               <div
                  key={`InfoBox-${index}`}
                  onClick={() => {
                     event();
                  }}
                  className={`bg-white w-1/3 text-center shadow-md p-3 rounded-lg ${index !== 0 && 'cursor-pointer'}`}
               >
                  {icon}
                  {content}
               </div>
            ))}
         </div>
         <BottomSheet
            open={openBottomSheet}
            scrollLocking={true}
            expandOnContentDrag={true}
            ref={sheetRef}
            className="completed-mission-bottom-sheet"
            snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.95, maxHeight * 0.95]}
            onDismiss={() => {
               setOpenBottomSheet(false);
            }}
         >
            <MissionCompleted />
         </BottomSheet>
      </div>
   );
}
