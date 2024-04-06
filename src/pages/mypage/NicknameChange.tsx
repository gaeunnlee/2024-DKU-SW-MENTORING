import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useApi } from '../../hooks/useApi';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { useToastStore } from '../../stores/toast-stores';
import { FaCheckCircle } from 'react-icons/fa';
import { AxiosError } from 'axios';

export default function NicknameChange() {
   const { setIsToastShow } = useToastStore();
   const [nickname, setNickname] = useState('');
   const { patch } = useApi();
   const { closeSheet } = useBottomSheet();
   const [validation, setValidation] = useState({ length: false, character: false });

   const checkValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nickname = e.target.value;
      setValidation((prev) => ({
         character: /^[ㄱ-ㅎ가-힣a-zA-Z]+$/.test(nickname),
         length: nickname.length >= 3 && nickname.length <= 16,
      }));
   };
   const changeNickname = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validation.character && validation.length) {
         await patch({ api: '/user/change/nickname', auth: true, body: { nickname } })
            .then((response) => {
               closeSheet();
               setIsToastShow(true, `🖐️ ${nickname} 님, 안녕하세요!`);
            })
            .catch(function (error: AxiosError) {
               setIsToastShow(true, '이미 존재하는 닉네임입니다');
            });
      } else {
         setIsToastShow(true, '닉네임 형식을 다시 확인해주세요');
      }
   };

   return (
      <div className="p-3 flex flex-col gap-2">
         <h1 className="text-xl text-center">닉네임 변경</h1>
         <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
               changeNickname(e);
            }}
         >
            <ul className="p-4 flex flex-col gap-2 shadow-md w-full rounded-lg bg-white text-zinc-400">
               <li className={`flex gap-2 items-center ${validation.length && 'text-[#63ae79]'}`}>
                  <FaCheckCircle />
                  <span>3 ~ 16자 사이로 입력해주세요</span>
               </li>
               <li className={`flex gap-2 items-center ${validation.character && 'text-[#63ae79]'}`}>
                  <FaCheckCircle />
                  <span>영문 또는 한글로 입력해주세요</span>
               </li>
            </ul>
            <label className="flex items-center bg-[#f6f6f6] pr-3 rounded-md mb-2">
               <Input
                  onChange={(e) => {
                     setNickname(e.target.value);
                     checkValidation(e);
                  }}
                  className="w-full"
                  placeholder="새로운 닉네임을 입력해주세요"
               />
            </label>
            <Button value="변경하기" />
         </form>
      </div>
   );
}
