import React, { ReactNode } from 'react';
import { IBonusMission, IMission } from '../../data/interface';
import { RxDividerHorizontal } from 'react-icons/rx';
import { PiShootingStar } from 'react-icons/pi';
import { difficulty } from '../../data/enum';
import { GoGoal } from 'react-icons/go';
import { TbHeartPlus } from 'react-icons/tb';
import { MdOutlineCheckBox } from 'react-icons/md';

export default function MissionDetail({ data }: { data: IMission }) {
   const detailList = [
      {
         name: '난이도',
         value: Object.getOwnPropertyDescriptor(difficulty, data.difficulty)?.value,
         icon: <PiShootingStar style={{ fontSize: '25px' }} />,
      },
      {
         name: '점수',
         value: `${data.point}점`,
         icon: <GoGoal style={{ fontSize: '25px' }} />,
      },
      {
         name: '보너스 미션',
         icon: <TbHeartPlus style={{ fontSize: '25px' }} />,
         bonusMission: data.bonusMission,
      },
   ];
   return (
      <div className="w-full flex flex-col items-center h-[50vh] gap-3">
         <RxDividerHorizontal style={{ fontSize: '30px' }} />
         <h3>{data.name}</h3>
         <p>{data.description}</p>
         <hr style={{ border: '1px solid #eee', width: '100%' }} />
         <div className="flex flex-col items-start w-full gap-5 mt-5">
            {detailList.map((item) => (
               <ListItem key={item.name} name={item.name} value={item.value} icon={item.icon} bonusMission={item.bonusMission} />
            ))}
         </div>
      </div>
   );
}

const ListItem = ({ name, icon, value, bonusMission }: { name: string; icon: ReactNode; value?: string; bonusMission?: IBonusMission[] }) => (
   <li className={`flex w-full px-5 gap-6 ${name === '보너스 미션' ? 'items-start' : 'items-center'}`}>
      {icon}
      <div className="flex flex-col gap-[6px] text-[13px]">
         <span>{name}</span>
         {name === '보너스 미션' ? (
            bonusMission !== undefined && bonusMission.length > 0 ? (
               bonusMission?.map((item) => (
                  <li className="text-neutral-500 leading-4" key={item.id}>
                     <p className="flex gap-1 items-center">
                        <MdOutlineCheckBox />
                        {`${item.name} (+${item.point})`}
                     </p>
                     <p className="ml-4">{item.description}</p>
                  </li>
               ))
            ) : (
               <span className="text-neutral-500">없습니다🥲</span>
            )
         ) : (
            <span className="text-neutral-500">{value}</span>
         )}
      </div>
   </li>
);
