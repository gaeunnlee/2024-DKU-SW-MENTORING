import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Box from '../../components/ui/Box';
import Text from '../../components/ui/Text';
import { useAuth } from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import { IMyTeam, IUserInfo } from '../../data/interface';
import { FaUserCircle } from 'react-icons/fa';
import Menu from './Menu';
import TeamInfo from './TeamInfo';

export default function MyPage() {
   const { isLoggedIn } = useAuth();
   const { get } = useApi();
   const [userInfo, setUserInfo] = useState<IUserInfo>();
   const [teamInfo, setTeamInfo] = useState<IMyTeam>();

   useEffect(() => {
      get({ api: '/user', auth: true }).then(function (data: IUserInfo) {
         setUserInfo(data);
      });
      get({ api: '/team/my', auth: true }).then(function (response: IMyTeam) {
         setTeamInfo(response);
      });
   }, []);

   return (
      <Layout>
         {isLoggedIn ? (
            <>
               <div className="flex items-center gap-3 w-full">
                  <div className="w-[85px] flex justify-center text-[80px] text-[#ddd]">
                     <FaUserCircle />
                  </div>
                  <div className="flex flex-col gap-2 w-[calc(100%-100px)]">
                     {userInfo !== undefined && (
                        <p className="text-sm border-black border-solid border-[1px] w-fit px-2 py-[0.1rem] rounded-md">
                           {userInfo?.teamName}
                        </p>
                     )}
                     <p className="text-lg">{userInfo?.nickname}</p>
                     <div className="flex justify-between">
                        <p>
                           {userInfo?.username} ({userInfo?.studentId})
                        </p>
                     </div>
                  </div>
               </div>
               <hr />
               <TeamInfo data={teamInfo} />
               <hr />
               <Menu />
            </>
         ) : (
            <Box className="items-center" shadow={false}>
               <Text className="text-[15px]">로그인 후 이용 가능합니다</Text>
            </Box>
         )}
      </Layout>
   );
}
