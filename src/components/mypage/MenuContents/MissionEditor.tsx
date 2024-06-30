import React, { useState } from 'react';
import Input from '../../common/UI/Input';
import { difficultyList } from '../../../data/difficultyList';
import Button from '../../common/UI/Button';
import { useApi } from '../../../hooks/useApi';
import { useModal } from '../../../hooks/useModal';
import { useBottomSheet } from '../../../hooks/useBottomSheet';

export default function MissionEditor() {
   const { post } = useApi();
   const [missionData, setMissionData] = useState({ name: '', description: '', difficulty: '' });
   const { name: missionName, description: missionDescription, difficulty } = missionData;
   const { open } = useModal();
   const { closeSheet } = useBottomSheet();
   const submitMission = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (missionName.length > 0 && missionDescription.length > 0 && difficulty.length > 0) {
         post({
            api: `/mission/create/outbreak?difficulty=${missionData.difficulty}`,
            body: { name: missionData.name, description: missionData.description },
            auth: true,
         })
            .then(() => {
               alert('업로드 완료');
               closeSheet();
            })
            .catch((e) => {
               alert(e);
            });
      } else {
         alert('모두 입력해주세요');
         open({ type: 'error', content: '모두 입력해주세요' });
      }
   };

   return (
      <form
         onSubmit={(e) => {
            submitMission(e);
         }}
         className="flex flex-col w-full p-4 gap-3"
      >
         <h1 className="text-xl text-center mb-5">미션 추가</h1>
         <div className="flex justify-evenly">
            {difficultyList.map(({ id, name }) => (
               <label
                  key={id}
                  className="has-[input:checked]:bg-black min-w-[3.5rem] bg-[#f6f6f6] has-[input:checked]:text-white p-2 rounded-lg cursor-pointer text-center"
               >
                  <input
                     onChange={(e) => {
                        setMissionData((prev) => ({ ...prev, difficulty: e.target.value }));
                     }}
                     className="hidden"
                     type="radio"
                     name="difficulty"
                     value={id}
                  />
                  {name}
               </label>
            ))}
         </div>
         <Input
            onChange={(e) => {
               setMissionData((prev) => ({ ...prev, name: e.target.value }));
            }}
            placeholder="미션"
         />
         <textarea
            onChange={(e) => {
               setMissionData((prev) => ({ ...prev, description: e.target.value }));
            }}
            className="bg-[#f6f6f6] h-[80px] p-4 rounded-md text-[13px]"
            placeholder="설명"
         />
         <Button value="등록" />
      </form>
   );
}
