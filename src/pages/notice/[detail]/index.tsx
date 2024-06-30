import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { useApi } from '../../../hooks/useApi';
import { INotice } from '../../../data/interface';
import { useNavStore } from '../../../stores/nav-stores';

import { MdOutlineDateRange } from 'react-icons/md';
import Comment from '../../../components/common/Comment';
import Carousel from '../../../components/common/Carousel/Carousel';
import styled from 'styled-components';
import parse from 'html-react-parser';
import Layout from '../../../components/common/Layout';

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
                     {content?.createdAt.slice(0, 10)}
                  </div>
                  <div className="flex gap-1 items-center text-sm">
                     <FaRegComment className="text-zinc-500" />
                     댓글 {content?.commentCount}
                  </div>
               </div>
               <p className="flex gap-1 items-center text-zinc-900 font-bold mt-2">{content?.title}</p>

               <p className="text-zinc-700">{parse(content?.body ?? '')}</p>
               {content?.images && content.images.length > 0 && <Carousel data={content.images} />}
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
