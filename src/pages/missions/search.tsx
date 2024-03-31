import React, { SetStateAction } from 'react';
import Missions from '.';

export default function SearchMission({ setMissionId }: { setMissionId: React.Dispatch<SetStateAction<number>> }) {
   const passMissionId = (id: number) => {
      setMissionId(id);
   };
   return (
      <div className="w-full pl-2">
         <Missions searchMode passMissionId={passMissionId} />
      </div>
   );
}
