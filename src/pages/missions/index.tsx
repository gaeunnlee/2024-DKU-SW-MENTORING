import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Box from '../../components/ui/Box';
import styled from 'styled-components';
import { difficulty } from '../../data/enum';
import { useModal } from '../../hooks/useModal';
import { IMission, IMissionBoard } from '../../data/interface';
import MissionDetail from './detail';
import { useApi } from '../../hooks/useApi';
import { difficultyList } from '../../data/difficultyList';
import HorizontalScrollBox from '../../components/HorizontalScrollBox';
import { SwiperSlide } from 'swiper/react';
import { useLayoutScrollStore } from '../../stores/layout-scroll-stores';

export default function Missions({ searchMode, passMissionId }: { searchMode?: boolean; passMissionId?: (id: number) => void }) {
   const [missions, setMissions] = useState<IMission[]>();
   const [filteredDifficulty, setFilteredDifficulty] = useState('');
   const [hasBonusMission, setHasBonusMission] = useState<boolean>();
   const { open, close } = useModal();
   const { get } = useApi();

   const { setIsScrollTop } = useLayoutScrollStore();

   const fetchMissions = ({ difficulty, hasBonusMission }: { difficulty?: string; hasBonusMission?: boolean }) => {
      get({
         api: `/mission?page=0&size=200${hasBonusMission ? `&hasBonusMission=${hasBonusMission}` : ''}${difficulty ? `&difficulty=${filteredDifficulty}` : ''}`,
      }).then(function (data: IMissionBoard) {
         setMissions(data.content);
      });
   };

   useEffect(() => {
      fetchMissions({});
   }, []);

   const showDetail = (data: IMission) => {
      open({
         type: 'bottom',
         content: <MissionDetail data={data} />,
      });
   };

   const filterMissionsByDifficulty = (e: React.MouseEvent<HTMLElement>) => {
      setHasBonusMission(false);
      setIsScrollTop(true);

      if (e.currentTarget.id === filteredDifficulty) {
         e.currentTarget.classList.remove('checked');
         setFilteredDifficulty('');
      } else {
         document.querySelector('.checked')?.classList.remove('checked');
         e.currentTarget.classList.toggle('checked');
         setFilteredDifficulty(e.currentTarget.id);
      }
   };

   const filterBonusMission = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (hasBonusMission) {
         document.querySelector('.checked')?.classList.remove('checked');
         setHasBonusMission(false);
      } else {
         document.querySelector('.checked')?.classList.remove('checked');
         e.currentTarget.parentElement!.classList.add('checked');
         setHasBonusMission(true);
      }
      setFilteredDifficulty('');
      setIsScrollTop(true);
   };

   useEffect(() => {
      if (filteredDifficulty === '' && hasBonusMission === false) {
         fetchMissions({});
      } else {
         fetchMissions({
            hasBonusMission: hasBonusMission,
            difficulty: filteredDifficulty,
         });
      }
   }, [hasBonusMission, filteredDifficulty]);

   return (
      <Layout className="w-full overscroll" style={{ padding: 0, height: 'calc(100dvh - 60px)' }}>
         <FilterContainer className="flex gap-2 sticky top-0 bg-white p-3">
            <label className=" cursor-pointer bg-zinc-100 px-3 py-1 text-zinc-500 rounded-full flex whitespace-nowrap">
               <input
                  className="hidden"
                  type="checkbox"
                  onChange={(e) => {
                     filterBonusMission(e);
                  }}
               />
               보너스
            </label>
            <HorizontalScrollBox>
               {difficultyList.map(({ id, name }) => (
                  <SwiperSlide
                     key={id}
                     id={id}
                     className="difficulty cursor-pointer bg-zinc-100 px-4 py-1 text-zinc-500 rounded-full"
                     onClick={(e) => {
                        filterMissionsByDifficulty(e);
                     }}
                  >
                     {name}
                  </SwiperSlide>
               ))}
            </HorizontalScrollBox>
         </FilterContainer>
         <div className="h-[80dvh] px-3 pb-[60px] mb-[30px]">
            {missions?.map((item) => (
               <Box
                  onClick={() => {
                     if (searchMode) {
                        close();
                        passMissionId !== undefined && passMissionId(item.id);
                     } else {
                        showDetail(item);
                     }
                  }}
                  shadow={false}
                  key={item.id}
                  className="cursor-pointer items-center gap-2"
               >
                  <Mission>
                     <Number>{item.id}</Number>
                     <div className="flex flex-col gap-1">
                        <MissionName>{item.name}</MissionName>
                        <MissionInfo>
                           <Difficulty>{Object.getOwnPropertyDescriptor(difficulty, item.difficulty)?.value}</Difficulty>
                           <span>{item.point}점</span>
                           {item.bonusMission.length > 0 && <span>보너스 미션 ♥️</span>}
                        </MissionInfo>
                     </div>
                  </Mission>
               </Box>
            ))}
         </div>
      </Layout>
   );
}

const FilterContainer = styled.div`
   .checked {
      background-color: black;
      color: white;
   }
`;

const Mission = styled.div`
   display: flex;
   width: 100%;
   gap: 10px;
   align-items: center;
`;

const Number = styled.span`
   border-radius: 100%;
   width: 25px;
   height: 25px;
   font-size: 11px;
   font-weight: bold;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 2px;
   background-color: #ccc;
   color: #fff;
`;

const MissionName = styled.p``;
const MissionInfo = styled.div`
   display: flex;
   gap: 5px;
   span {
      background-color: #eee;
      padding: 2.5px;
      font-size: 11px;
      border-radius: 2px;
   }
`;

const Difficulty = styled.span``;
