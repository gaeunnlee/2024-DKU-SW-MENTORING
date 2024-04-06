import React, { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { FaCheckCircle } from 'react-icons/fa';
import { useApi } from '../../hooks/useApi';
import { useBottomSheet } from '../../hooks/useBottomSheet';

interface INewPasswordValidation {
   isRegexValidate: undefined | boolean;
   isSame: undefined | boolean;
}

export default function PasswordChange() {
   const [pwInfo, setPwInfo] = useState({ password: '', newPassword: '' });
   const [validation, setValidation] = useState<INewPasswordValidation>({
      isRegexValidate: undefined,
      isSame: undefined,
   });
   const [errorMessage, setErrorMessage] = useState({ newPassword: '', newPasswordCheck: '' });
   const { patch } = useApi();
   const { closeSheet } = useBottomSheet();
   const checkNewPwValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
      switch (e.target.name) {
         case 'newPassword':
            if (e.target.value.length === 0) {
               setValidation({
                  isRegexValidate: undefined,
                  isSame: undefined,
               });
            } else {
               setValidation((prev) => ({ ...prev, isSame: undefined }));
               setValidation((prev) => ({ ...prev, isRegexValidate: e.target.value.length >= 8 }));
            }
            break;
         case 'newPasswordCheck':
            if (e.target.value.length === 0) {
               setValidation((prev) => ({
                  ...prev,
                  isSame: undefined,
               }));
            } else {
               setValidation((prev) => ({ ...prev, isSame: pwInfo.newPassword === e.target.value }));
            }
            break;
      }
   };

   const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (pwInfo.password.length > 0 && validation.isRegexValidate && validation.isSame) {
         try {
            patch({ api: '/user/change/password', auth: true, body: pwInfo }).then((response) => {
               closeSheet();
               alert('변경되었습니다');
            });
         } catch (e) {
            alert('비밀번호가 틀렸습니다');
         }
      } else {
         alert('비밀번호를 다시 확인해주세요');
      }
   };
   useEffect(() => {
      setErrorMessage((prev) => ({
         newPassword: validation.isRegexValidate === false ? '8자 이상 입력해주세요' : '',
         newPasswordCheck: validation.isSame === false ? '비밀번호가 같지 않습니다' : '',
      }));
   }, [validation]);

   return (
      <div className="p-3 flex flex-col gap-2">
         <h1 className="text-xl text-center">비밀번호 변경</h1>
         <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
               changePassword(e);
            }}
         >
            <label className="flex items-center bg-[#f6f6f6] pr-3 rounded-md mb-2">
               <Input
                  type="password"
                  onChange={(e) => {
                     setPwInfo((prev) => ({ ...prev, password: e.target.value }));
                  }}
                  className="w-full"
                  placeholder="기존 비밀번호를 입력해주세요"
               />
            </label>
            <div className="flex flex-col gap-2 h-[60px]">
               <label className="flex items-center bg-[#f6f6f6] pr-3 rounded-md">
                  <Input
                     type="password"
                     name="newPassword"
                     onChange={(e) => {
                        setPwInfo((prev) => ({ ...prev, newPassword: e.target.value }));
                        checkNewPwValidation(e);
                     }}
                     className="w-full"
                     placeholder="새로운 비밀번호를 입력해주세요"
                  />
                  {validation.isRegexValidate && <FaCheckCircle />}
               </label>
               <p className="text-red ml-3">{errorMessage.newPassword}</p>
            </div>
            <div className="flex flex-col gap-2 h-[60px]">
               <label className="flex items-center bg-[#f6f6f6] pr-3 rounded-md">
                  <Input
                     type="password"
                     name="newPasswordCheck"
                     onChange={(e) => {
                        checkNewPwValidation(e);
                     }}
                     className="w-full"
                     placeholder="새로운 비밀번호를 다시 입력해주세요"
                  />
                  {validation.isSame && <FaCheckCircle />}
               </label>
               <p className="text-red ml-3">{errorMessage.newPasswordCheck}</p>
            </div>
            <Button value="변경하기" />
         </form>
      </div>
   );
}
