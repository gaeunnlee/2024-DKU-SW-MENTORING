import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { INotice } from '../../data/interface';
import Layout from '../../components/Layout';
import { MdOutlineDateRange } from 'react-icons/md';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import Comment from '../../components/Comment';
import { useNavStore } from '../../stores/nav-stores';

export default function NoticeDetail() {
   const { pathname } = useLocation();
   const [noticeId, setNoticeId] = useState('');
   const [content, setContent] = useState<INotice>();
   const { get } = useApi();
   const { setIsPreviousVisible } = useNavStore();

   useEffect(() => {
      setNoticeId(pathname.split('/notice/')[1]);
      setIsPreviousVisible(true);
   }, []);

   useEffect(() => {
      noticeId.length > 0 &&
         get({ api: `/notice/${noticeId}`, auth: true }).then((response) => {
            setContent(response);
         });
   }, [noticeId]);

   return (
      <Layout>
         <Container>
            <div className="flex flex-col gap-[0.3rem]">
               <div className="flex justify-between text-zinc-500 text-sm items-center">
                  <p className=" bg-zinc-100 px-3 rounded-full ">{content?.author}</p>
                  <div className="flex gap-1 items-center text-sm">
                     <MdOutlineDateRange className="text-zinc-500 text-[1.2rem]" />
                     2024.03.26
                  </div>
                  <div className="flex gap-1 items-center text-sm">
                     <FaRegComment className="text-zinc-500" />
                     댓글 {content?.commentCount}
                  </div>
               </div>
               <p className="flex gap-1 items-center text-zinc-900 font-bold mt-2">{content?.title}</p>

               <p className="text-zinc-700">{content?.body}</p>
            </div>
         </Container>
         <CommentContainer>
            <p className="p-[1.2rem] pb-0">댓글</p>
            <Comment postId={Number(noticeId)} isScrollable={false} />
         </CommentContainer>
      </Layout>
   );
}

const Container = styled.div`
   background-color: #fdfdfd;
   display: flex;
   flex-direction: column;
   padding: 15px;
   gap: 0.8rem;
   border-radius: 10px;
   box-shadow: 1px 1px 1px 0 #00000020;
`;

const CommentContainer = styled.div`
   background-color: #fdfdfd;
   display: flex;
   flex-direction: column;
   border-radius: 10px;
   box-shadow: 1px 1px 1px 0 #00000020;
   .comment {
   }
`;
