import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useApi } from '../../hooks/useApi';
import { IMyTeam, IUserInfo } from '../../data/interface';
import { FaUserCircle } from 'react-icons/fa';
import Menu from './Menu';
import TeamInfo from './TeamInfo';
import { useRoleStore } from '../../stores/role-stores';
import AdminMenu from './AdminMenu';
import { useSheetStore } from '../../stores/sheet-stores';
import { useAuth } from '../../hooks/useAuth';

export default function MyPage() {
   const { get } = useApi();
   const [userInfo, setUserInfo] = useState<IUserInfo>();
   const [teamInfo, setTeamInfo] = useState<IMyTeam>();
   const { setRole, setIsAdmin } = useRoleStore();
   const { isSheetOpen } = useSheetStore();
   const { isLoggedIn } = useAuth();

   useEffect(() => {
      if (isLoggedIn) {
         get({ api: '/user', auth: true }).then(function (data: IUserInfo) {
            setUserInfo(data);
            setRole(data.role);
            setIsAdmin(data.role === 'Admin');
         });
      } else {
         setUserInfo({
            admin: false,
            nickname: 'GUEST',
            studentId: '',
            teamName: 'GUEST_TEAM',
            username: '비회원',
            role: 'guest',
         });
         setRole('guest');
         setIsAdmin(false);
      }
   }, []);

   useEffect(() => {
      isLoggedIn &&
         get({ api: '/user', auth: true }).then(function (data: IUserInfo) {
            setUserInfo(data);
         });
   }, [isSheetOpen]);

   useEffect(() => {
      if (userInfo?.admin === false && isLoggedIn) {
         get({ api: '/team/my', auth: true }).then(function (response: IMyTeam) {
            setTeamInfo(response);
         });
      } else if (userInfo?.admin === false && isLoggedIn === false) {
         setTeamInfo({
            teamName: '로그인 이후 이용 가능합니다',
            score: 0,
            mentor: '',
            members: [],
         });
      }
      userInfo?.admin;
   }, [userInfo]);

   return (
      <Layout>
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
                     {userInfo?.username} {userInfo?.studentId && `(${userInfo.studentId})`}
                  </p>
               </div>
            </div>
         </div>
         {userInfo?.admin === false ? (
            <>
               <hr />
               <TeamInfo data={teamInfo} />
               <hr />
               <Menu />
            </>
         ) : (
            <>
               <hr />
               <AdminMenu />
            </>
         )}
      </Layout>
   );
}
