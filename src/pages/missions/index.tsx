import React, { useState, ReactNode, useEffect } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import HorizontalScrollBox from '../../components/HorizontalScrollBox';
import { FaSearch } from 'react-icons/fa';
import { IMission } from '../../data/interface';
import Box from '../../components/ui/Box';
import { useSheetStore } from '../../stores/sheet-stores';
import MissionDetail from './detail';
import { useModal } from '../../hooks/useModal';
import { difficulty } from '../../data/enum';
import BoardLayout from '../../components/BoardLayout';
import { useDebounce } from '../../hooks/useDebounce';
import { useLayoutScrollStore } from '../../stores/layout-scroll-stores';

export default function Missions({
   selectMode,
   passMissionId,
}: {
   selectMode?: boolean;
   passMissionId?: (id: number) => void;
}) {
   const [filterStatus, setFilterStatus] = useState<FilterKey>({
      isSearchMode: false,
      difficulty: undefined,
      isBonusMission: false,
      isSuddenMission: false,
   });
   const [api, setApi] = useState('');
   const { setIsSheetOpen } = useSheetStore();
   const { open } = useModal();
   const [searchKeyword, setSearchKeyword] = useState('');
   const debouncedQuery = useDebounce(searchKeyword, 500);
   const { setIsScrollTop } = useLayoutScrollStore();

   const initializeFilterStatus = () => {
      setFilterStatus({
         isSearchMode: false,
         difficulty: undefined,
         isBonusMission: false,
         isSuddenMission: false,
      });
   };

   const handleFilterMission = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsScrollTop(true);
      initializeFilterStatus();
      setFilterStatus((prev) => ({
         ...prev,
         [e.target.value]: e.target.id,
      }));
   };

   const handleFilterButtonClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      type Key = 'isSearchMode' | 'isBonusMission' | 'isSuddenMission' | 'difficulty';
      let property: Key;
      for (property in filterStatus) {
         if (e.currentTarget.value === property && filterStatus[property]) {
            if (property === 'difficulty') {
               if (filterStatus.difficulty === e.currentTarget.id) {
                  e.currentTarget.checked = false;
                  initializeFilterStatus();
               }
            } else {
               e.currentTarget.checked = false;
               initializeFilterStatus();
            }
         }
      }
   };

   const showDetail = (data: IMission) => {
      open({
         type: 'bottom',
         content: <MissionDetail data={data} />,
      });
   };

   useEffect(() => {
      setApi(`/mission?sort=id,asc${debouncedQuery.length > 0 ? `&keyword=${debouncedQuery}` : ''}`);
   }, [debouncedQuery]);

   useEffect(() => {
      const { isBonusMission, isSuddenMission, difficulty } = filterStatus;
      setSearchKeyword('');
      isSuddenMission
         ? setApi('/mission/outbreak?sort=id,asc')
         : setApi(`/mission?sort=id,asc${filterStatus ? `&hasBonusMission=${isBonusMission}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}`); // prettier-ignore
   }, [filterStatus]);

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

   return (
      <Layout className="w-full overscroll" style={{ padding: 0, height: 'calc(100dvh - 60px)' }}>
         <FilterContainer>
            {fixedFilterButtonList.slice(0, filterStatus.isSearchMode ? 1 : 3).map(({ key, value, content }) => (
               <FilterButton
                  key={key}
                  filterKey={key}
                  filterValue={value}
                  content={content}
                  onChange={(e) => {
                     handleFilterMission(e);
                  }}
                  onClick={(e) => {
                     handleFilterButtonClick(e);
                  }}
               />
            ))}
            {filterStatus.isSearchMode && (
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
            <HorizontalScrollBox width="calc(100% - 190px)">
               {scrolledFilterButtonList.slice(0, filterStatus.isSearchMode ? 0 : 6).map(({ key, value, content }) => (
                  <SwiperSlide key={value}>
                     <FilterButton
                        filterKey={key}
                        filterValue={value}
                        content={content}
                        onChange={(e) => {
                           handleFilterMission(e);
                        }}
                        onClick={(e) => {
                           handleFilterButtonClick(e);
                        }}
                     />
                  </SwiperSlide>
               ))}
            </HorizontalScrollBox>
         </FilterContainer>
         <BoardLayout<IMission>
            className="px-2"
            option={{ itemPerPage: 10 }}
            api={api}
            setCell={(data: IMission) => <Cell data={data} />}
         />
      </Layout>
   );
}

const FilterButton = ({
   filterKey,
   filterValue,
   content,
   onChange,
   onClick,
}: {
   filterKey: string;
   filterValue: string | boolean;
   content: string | ReactNode;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}) => (
   <label className="cursor-pointer bg-zinc-100 px-3 py-1 text-zinc-500 rounded-full flex whitespace-nowrap">
      <input
         type="radio"
         id={String(filterValue)}
         value={filterKey}
         name="filterKey"
         className="hidden"
         onClick={(e) => {
            onClick(e);
         }}
         onChange={(e) => {
            onChange(e);
         }}
      />
      {content}
   </label>
);

const FilterContainer = styled.div`
   display: flex;
   gap: 1rem;
   position: sticky;
   height: 50px;
   align-items: center;
   top: -1px;
   background-color: white;
   padding: 0 1rem;
   z-index: 999;
   .checked {
      background-color: black;
      color: white;
   }
   label:has(input:checked) {
      background-color: #000;
      color: #fff;
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

type FilterKey = {
   isSearchMode: boolean;
   difficulty: undefined | 'VERY_EASY' | 'EASY' | 'NORMAL' | 'NORMAL_HARD' | 'HARD' | 'VERY_HARD';
   isBonusMission: boolean | undefined;
   isSuddenMission: boolean | undefined;
};

const fixedFilterButtonList = [
   {
      key: 'isSearchMode',
      value: true,
      content: <FaSearch />,
   },
   {
      key: 'isBonusMission',
      value: true,
      content: '보너스',
   },
   {
      key: 'isSuddenMission',
      value: true,
      content: '돌발🚨',
   },
];

const scrolledFilterButtonList = [
   {
      key: 'difficulty',
      value: 'VERY_EASY',
      content: '최하',
   },
   {
      key: 'difficulty',
      value: 'EASY',
      content: '하',
   },
   {
      key: 'difficulty',
      value: 'NORMAL',
      content: '중',
   },
   {
      key: 'difficulty',
      value: 'NORMAL_HARD',
      content: '중상',
   },
   {
      key: 'difficulty',
      value: 'HARD',
      content: '상',
   },
   {
      key: 'difficulty',
      value: 'VERY_HARD',
      content: '최상',
   },
];
