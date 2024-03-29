import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useApi } from '../../hooks/useApi';
import { INotice, INoticeBoard } from '../../data/interface';
import NoticePost from './post';

export default function Notice() {
   const [noticeBoard, setNoticeBoard] = useState<INotice[]>();
   const { get } = useApi();
   useEffect(() => {
      get({ api: '/notice' }).then((response: INoticeBoard) => {
         setNoticeBoard(response.content);
      });
   }, []);
   return (
      <Layout className="gap-5">
         {noticeBoard?.map((data: INotice) => (
            <NoticePost key={data.id} data={data} />
         ))}
      </Layout>
   );
}
