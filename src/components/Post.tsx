import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IMission, IPost } from '../data/interface';
import { HiUserCircle } from 'react-icons/hi';
import Carousel from './Carousel/Carousel';
import { getMission } from '../utils/getMission';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Comment from './Comment';

const Container = styled.div`
   display: flex;
   flex-direction: column;
`;

export default function Post({ data }: { data: IPost }) {
   const [missionName, setMissionName] = useState('');
   const [openBottomSheet, setOpenBottomSheet] = useState(false);
   const sheetRef = useRef<BottomSheetRef>(null);
   useEffect(() => {
      getMission(data.missionId).then(function (data: IMission) {
         setMissionName(data.name);
      });
   }, []);
   const handleDismiss = () => {
      setOpenBottomSheet(false);
   };

   return (
      <Container>
         <div className="flex items-center gap-1">
            <HiUserCircle style={{ fontSize: '40px', color: '#ddd' }} />
            <div className="flex flex-col">
               <p className="leading-0 text-[0.9rem]">{data.author}</p>
               <p className="leading-0 text-sm text-slate-800">{missionName}</p>
            </div>
         </div>
         <div>
            <Carousel data={data.images} />
         </div>
         <div className="flex flex-col gap-1 mt-5 ml-2">
            <div className="flex gap-2">
               <span className="text-blue-700">#{data.title}</span>
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
                  snapPoints={({ minHeight, maxHeight }) => [
                     maxHeight * 0.95,
                     maxHeight * 0.95,
                  ]}
                  onDismiss={handleDismiss}
               >
                  <Comment postId={data.id} />
               </BottomSheet>
            </div>
         </div>
      </Container>
   );
}
