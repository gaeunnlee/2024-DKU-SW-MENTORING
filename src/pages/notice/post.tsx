import React, { useState } from 'react';
import { INotice, INoticeDetail } from '../../data/interface';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { AiOutlineNotification } from 'react-icons/ai';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

export default function NoticePost({
   data: { id, title, author, body, images, files, commentCount, createdAt },
}: {
   data: INotice;
}) {
   const [detail, setDetail] = useState<INoticeDetail>();
   const navigate = useNavigate();

   return (
      <Container
         onClick={() => {
            navigate(`/notice/${id}`);
         }}
      >
         <div className="flex flex-col gap-[0.3rem]">
            <p className="flex gap-1 items-center text-zinc-900">
               <AiOutlineNotification />
               {title}
            </p>
            <p className={`text-zinc-700 ${detail || 'line-clamp-1'}`}>{detail ? detail.body : body}</p>
         </div>
         <div className="flex justify-between text-zinc-500 text-sm items-center">
            <p className=" bg-zinc-100 px-3 rounded-full ">{author}</p>
            <div className="flex gap-1 items-center text-sm">
               <MdOutlineDateRange className="text-zinc-500 text-[1.2rem]" />
               {createdAt.slice(0, 10)}
            </div>
            <div className="flex gap-1 items-center text-sm">
               <FaRegComment className="text-zinc-500" />
               댓글 {commentCount}
            </div>
         </div>
      </Container>
   );
}

const Container = styled.div`
   background-color: #fdfdfd;
   display: flex;
   flex-direction: column;
   padding: 15px;
   gap: 0.8rem;
   border-radius: 10px;
   box-shadow: 1px 1px 1px 0 #00000030;
   cursor: pointer;
`;
