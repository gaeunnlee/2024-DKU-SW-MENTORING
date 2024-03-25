import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Box from '../../components/ui/Box';
import Text from '../../components/ui/Text';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import profile from '../../assets/images/profile.png';
import { useApi } from '../../hooks/useApi';
import { IUserInfo } from '../../data/interface';
import { IoSettingsSharp } from 'react-icons/io5';
import { useModal } from '../../hooks/useModal';
import ProfileEditor from './ProfileEditor';

export default function MyPage() {
   const { isLoggedIn, logout } = useAuth();
   const { get } = useApi();
   const [userInfo, setUserInfo] = useState<IUserInfo>();
   const { open } = useModal();

   useEffect(() => {
      get({ api: '/user', auth: true }).then(function (data: IUserInfo) {
         setUserInfo(data);
      });
   }, []);

   const openProfileEditor = () => {
      open({
         type: 'bottom',
         content: (
            <div className="isParentFullHeight">
               <ProfileEditor />
            </div>
         ),
      });
   };

   return (
      <Layout>
         {isLoggedIn ? (
            <>
               <div className="flex items-center gap-3 w-full">
                  <div className="flex flex-col gap-2 w-[100px] h-[100px] border-zinc-300 bo border-solid border-[1px] rounded-full overflow-hidden">
                     <img className="w-[100px] h-[100px]" src={profile} />
                  </div>
                  <div className="flex flex-col gap-2 w-[calc(100%-100px)]">
                     <p className="text-sm border-black border-solid border-[1px] w-fit px-2 py-[0.1rem] rounded-md">
                        {userInfo?.teamName}
                     </p>
                     <p className="text-lg">{userInfo?.nickname}</p>
                     <div className="flex justify-between">
                        <p>
                           {userInfo?.username} ({userInfo?.studentId})
                        </p>
                        <button
                           onClick={() => {
                              openProfileEditor();
                           }}
                           className="flex gap-1"
                        >
                           <IoSettingsSharp />내 정보 수정
                        </button>
                     </div>
                  </div>
               </div>
               <Button
                  onClick={() => {
                     logout();
                  }}
                  value="로그아웃"
               />
            </>
         ) : (
            <Box className="items-center" shadow={false}>
               <Text className="text-[15px]">로그인 후 이용 가능합니다</Text>
            </Box>
         )}
      </Layout>
   );
}
