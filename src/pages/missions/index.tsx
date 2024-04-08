import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Box from '../../components/ui/Box';
import styled from 'styled-components';
import { difficulty } from '../../data/enum';
import { useModal } from '../../hooks/useModal';
import { IMission } from '../../data/interface';
import MissionDetail from './detail';
import { difficultyList } from '../../data/difficultyList';
import HorizontalScrollBox from '../../components/HorizontalScrollBox';
import { SwiperSlide } from 'swiper/react';
import { useLayoutScrollStore } from '../../stores/layout-scroll-stores';
import BoardLayout from '../../components/BoardLayout';
import { useSheetStore } from '../../stores/sheet-stores';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../../hooks/useDebounce';

export default function Missions({
   selectMode,
   passMissionId,
}: {
   selectMode?: boolean;
   passMissionId?: (id: number) => void;
}) {
   const [filteredDifficulty, setFilteredDifficulty] = useState<string | undefined>('');
   const [hasBonusMission, setHasBonusMission] = useState<boolean | undefined>();
   const [isSearchMode, setIsSearchMode] = useState(false);
   const [searchKeyword, setSearchKeyword] = useState('');
   const [api, setApi] = useState('');
   const { open } = useModal();
   const { setIsSheetOpen } = useSheetStore();
   const debouncedQuery = useDebounce(searchKeyword, 500);

   const { setIsScrollTop } = useLayoutScrollStore();

   const handleMissionApi = ({
      difficulty,
      hasBonusMission,
      searchKeyword,
   }: {
      difficulty?: string;
      hasBonusMission?: boolean;
      searchKeyword?: string;
   }) => {
      setApi(
         `/mission?sort=id,asc${hasBonusMission ? `&hasBonusMission=${hasBonusMission}` : ''}${difficulty ? `&difficulty=${filteredDifficulty}` : ''}${searchKeyword ? `&keyword=${searchKeyword}` : ''}`
      );
   };

   useEffect(() => {
      handleMissionApi({});
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

   const Cell = ({ data }: { data: IMission }) => (
      <Box
         onClick={() => {
            if (selectMode) {
               setIsSheetOpen(false);
               passMissionId !== undefined && passMissionId(data.id);
            } else {
               showDetail(data);
            }
         }}
         shadow={false}
         key={data.id}
         className="cursor-pointer items-center gap-2"
      >
         <Mission>
            <Number>{data.id}</Number>
            <div className="flex flex-col gap-1">
               <MissionName>{data.name}</MissionName>
               <MissionInfo>
                  <Difficulty>{Object.getOwnPropertyDescriptor(difficulty, data.difficulty)?.value}</Difficulty>
                  <span>{data.point}점</span>
                  {data.bonusMission.length > 0 && <span>보너스 미션 ♥️</span>}
               </MissionInfo>
            </div>
         </Mission>
      </Box>
   );

   useEffect(() => {
      if (isSearchMode) {
         setHasBonusMission(undefined);
         setFilteredDifficulty(undefined);
      } else {
         handleMissionApi({});
         setSearchKeyword('');
      }
   }, [isSearchMode]);

   useEffect(() => {
      handleMissionApi({
         searchKeyword: debouncedQuery,
      });
   }, [debouncedQuery]);

   useEffect(() => {
      if (filteredDifficulty === '' && hasBonusMission === false) {
         handleMissionApi({});
      } else {
         handleMissionApi({
            hasBonusMission: hasBonusMission,
            difficulty: filteredDifficulty,
            searchKeyword: '',
         });
      }
   }, [hasBonusMission, filteredDifficulty]);

   return (
      <Layout className="w-full overscroll" style={{ padding: 0, height: 'calc(100dvh - 60px)' }}>
         <FilterContainer className="flex gap-2 sticky top-0 bg-white p-3">
            <label className="cursor-pointer bg-zinc-100 px-3 py-1 text-zinc-500 rounded-full flex whitespace-nowrap">
               <input
                  className="hidden"
                  type="checkbox"
                  onClick={(e) => {
                     e.currentTarget.parentElement!.classList.toggle('checked');
                     setIsSearchMode((prev) => !prev);
                  }}
               />
               <FaSearch />
            </label>
            {isSearchMode && (
               <input
                  className="w-full"
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  value={searchKeyword}
                  onChange={(e) => {
                     setSearchKeyword(e.target.value);
                  }}
               />
            )}
            {isSearchMode || (
               <>
                  <label className="cursor-pointer bg-zinc-100 px-3 py-1 text-zinc-500 rounded-full flex whitespace-nowrap">
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
               </>
            )}
         </FilterContainer>
         <BoardLayout<IMission>
            option={{ itemPerPage: 10 }}
            api={api}
            setCell={(data: IMission) => <Cell data={data} />}
         />
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
