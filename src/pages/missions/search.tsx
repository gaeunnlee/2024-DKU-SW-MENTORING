import React, { SetStateAction } from 'react';
import Missions from '.';

export default function SearchMission({
   setMissionId,
}: {
   setMissionId: React.Dispatch<SetStateAction<number>>;
}) {
   const passMissionId = (id: number) => {
      setMissionId(id);
   };
   return (
      <>
         <h3>미션 선택</h3>
         <div className="w-full h-[80vh]">
            <Missions searchMode passMissionId={passMissionId} />
         </div>
      </>
   );
}
