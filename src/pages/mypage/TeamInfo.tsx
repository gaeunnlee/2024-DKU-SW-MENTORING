import React from 'react';
import { IMyTeam } from '../../data/interface';
import { ReactComponent as ScoreIcon } from '../../assets/svg/target-dynamic-color.svg';
import { ReactComponent as SuccessIcon } from '../../assets/svg/thumb-up-dynamic-color.svg';
import { ReactComponent as MissionIcon } from '../../assets/svg/folder-dynamic-color.svg';
import { useNavigate } from 'react-router-dom';

export default function TeamInfo({ data }: { data?: IMyTeam }) {
   const navigate = useNavigate();
   const infoBoxData = [
      {
         icon: <ScoreIcon width="100%" height="50" />,
         content: (
            <p>
               점수
               <br />
               <span className="text-lg">320점</span>
            </p>
         ),
         link: '',
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
         link: '/my-posts',
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
         link: '',
      },
   ];
   return (
      <div className="bg-[#f9f9f9] px-5 py-3 rounded-lg flex flex-col gap-2">
         <p className="text-lg leading-none bg-zinc-500 w-fit text-white px-2 py-1 rounded-lg">{data?.teamName}</p>
         <div className="flex items-end gap-2 mb-2">
            <span className="text-lg leading-none">{data?.mentor}</span>
            {data?.members.map((name) => (
               <span key={name} className="leading-none">
                  {name}
               </span>
            ))}
         </div>
         <div className="flex gap-9 w-full">
            {infoBoxData.map(({ icon, content, link }) => (
               <div
                  key="link"
                  onClick={() => {
                     link && navigate(link);
                  }}
                  className="bg-white w-1/3 text-center shadow-md p-3 rounded-lg"
               >
                  {icon}
                  {content}
               </div>
            ))}
         </div>
      </div>
   );
}