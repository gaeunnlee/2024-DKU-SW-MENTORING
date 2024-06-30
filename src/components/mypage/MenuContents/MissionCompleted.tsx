import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { ICompletedMission, ICompletedMissionBoard } from '../../../data/interface';

export default function MissionCompleted() {
   const [missions, setMissions] = useState<ICompletedMission[]>();
   const { get } = useApi();

   useEffect(() => {
      get({ api: '/team/success/mission?size=100', auth: true }).then((response: ICompletedMissionBoard) => {
         setMissions(response.content);
      });
   }, []);

   return (
      <div className="flex flex-col gap-5 py-2 px-4">
         <p className="self-center text-lg">성공한 미션</p>
         {missions?.map(({ id, name, point }) => (
            <div key={id} className="p-5 bg-white rounded-xl shadow-sm">
               <p>
                  ✅ {name} +{point}
               </p>
            </div>
         ))}
      </div>
   );
}
