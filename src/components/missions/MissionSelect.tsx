import React, { SetStateAction } from 'react';
import Missions from '../../pages/missions/index';

export default function SelectMission({ setMissionId }: { setMissionId: React.Dispatch<SetStateAction<number>> }) {
   const passMissionId = (id: number) => {
      setMissionId(id);
   };
   return (
      <div className="w-full pl-2">
         <Missions selectMode passMissionId={passMissionId} />
      </div>
   );
}
