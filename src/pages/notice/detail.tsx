import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { INotice } from '../../data/interface';

export default function NoticeDetail() {
   const { pathname } = useLocation();
   const [noticeId, setNoticeId] = useState('');
   const [content, setContent] = useState<INotice>();
   const { get } = useApi();
   useEffect(() => {
      setNoticeId(pathname.split('/notice/')[1]);
   }, []);
   useEffect(() => {
      get({ api: `/notice/${noticeId}`, auth: true }).then((response) => {
         setContent(response);
      });
   }, [noticeId]);

   return <>{content?.body}</>;
}
