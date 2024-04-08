import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useApi } from '../../hooks/useApi';
import { INotice, INoticeBoard } from '../../data/interface';
import NoticePost from './post';
import FloatingButton from '../../components/ui/FloatingButton';
import { FaPencil } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useRoleStore } from '../../stores/role-stores';

export default function Notice() {
   const [noticeBoard, setNoticeBoard] = useState<INotice[]>();
   const { get } = useApi();
   const navigate = useNavigate();
   const { role } = useRoleStore();
   useEffect(() => {
      get({ api: '/notice' }).then((response: INoticeBoard) => {
         setNoticeBoard(response.content);
      });
   }, []);
   return (
      <Layout className="gap-5">
         {noticeBoard?.map((data: INotice) => <NoticePost key={data.id} data={data} />)}
         {role === 'Admin' && (
            <FloatingButton
               event={() => {
                  navigate('/notice-upload');
               }}
            >
               <FaPencil color="white" size={30} />
            </FloatingButton>
         )}
      </Layout>
   );
}
