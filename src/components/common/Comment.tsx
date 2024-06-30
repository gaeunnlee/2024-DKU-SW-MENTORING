import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { ICommentResponse } from '../../data/interface';
import { IoIosSend } from 'react-icons/io';
import Textarea from './UI/Textarea';
import styled from 'styled-components';
import Button from './UI/Button';

export default function Comment({ postId, isScrollable }: { postId: number; isScrollable?: boolean }) {
   const { get, post } = useApi();
   const [commentList, setCommentList] = useState<ICommentResponse[]>();
   const [selectedComment, setSelectedComment] = useState<number>();
   const [textareaValue, setTextareaValue] = useState('');
   const [textareaRef, setTextareaRef] = useState<MutableRefObject<null | HTMLTextAreaElement>>();
   const lastReplyRef = useRef<HTMLDivElement>(null);
   const commentListRef = useRef<HTMLDivElement>(null);

   const fetchCommentList = () => {
      get({ api: `/post/mission-board/comments/${postId}`, auth: true }).then((response: ICommentResponse[]) => {
         setCommentList(response);
      });
   };

   const selectComment = (e: React.MouseEvent<HTMLButtonElement>, commentId: number) => {
      if (selectedComment === commentId) {
         setSelectedComment(0);
      } else {
         setSelectedComment(commentId);
         textareaRef?.current!.focus();
      }
   };

   const postComment = async (e: React.FormEvent<HTMLFormElement> | undefined) => {
      e !== undefined && e.preventDefault();
      await post({
         api: `${selectedComment ? `/post/mission-board/reply/${selectedComment}` : `/post/mission-board/comment/${postId}`}`,
         body: { content: textareaValue },
         auth: true,
      }).then(() => {
         textareaRef?.current!.blur();
         setTextareaValue('');
         setSelectedComment(0);
         fetchCommentList();
      });
   };

   useEffect(() => {
      fetchCommentList();
   }, [postId]);

   useEffect(() => {
      if (selectedComment !== 0 && selectedComment !== undefined) {
         lastReplyRef.current!.scrollIntoView({ behavior: 'smooth' });
      } else if (selectedComment === 0) {
         commentListRef.current!.scrollTo({
            top: commentListRef.current!.scrollHeight,
            behavior: 'smooth',
         });
      }
   }, [commentList]);

   return (
      <Container className="comment">
         <CommentWrapper
            ref={commentListRef}
            selected={selectedComment !== undefined && selectedComment > 0}
            isScrollable={isScrollable}
         >
            {commentList?.map((item) => (
               <div key={item.id}>
                  <div
                     className={`flex flex-col justify-center p-3 gap-1 ${selectedComment === item.id && 'selected'}`}
                  >
                     <div className="flex gap-2 items-center">
                        <p>{item.author}</p>
                        <button
                           onClick={(e) => {
                              selectComment(e, item.id);
                           }}
                           className=" text-zinc-400"
                        >
                           {selectedComment === item.id ? '답글 취소' : '답글 달기'}
                        </button>
                     </div>
                     <div>{item.content}</div>
                  </div>
                  <div className="ml-8 flex flex-col gap-2 ">
                     {item.replies.map((reply) => (
                        <div key={reply.id}>
                           <span>{reply.author} &nbsp;</span>
                           <span className="text-zinc-500">{reply.content}</span>
                        </div>
                     ))}
                     <div ref={lastReplyRef}></div>
                  </div>
               </div>
            ))}
         </CommentWrapper>
         <form
            className={`flex flex-col gap-2 p-4 ${selectedComment ? 'h[7rem]' : 'h[5.5rem]'}`}
            onSubmit={(e) => {
               postComment(e);
            }}
         >
            {selectedComment !== undefined && selectedComment > 0 && (
               <span className="w-fit text-sm text-zinc-500 bg-[#edf6ff] px-2 py-1 rounded-full">답글 작성 중 ...</span>
            )}
            <div className="flex items-center p-4 bg-zinc-100 rounded-lg shadow-md">
               <Textarea
                  className="comment-textarea w-[calc(100%-50px)] bg-transparent "
                  value={textareaValue}
                  onChange={(e) => {
                     setTextareaValue(e.target.value);
                  }}
                  onKeyDown={(e) => {
                     e.key === 'Enter' && postComment(undefined);
                  }}
                  placeholder={selectedComment !== 0 ? '답글을 입력해주세요' : '댓글을 입력해주세요'}
                  setRef={setTextareaRef}
               />
               <label className="w-[50px] text-[2rem] cursor-pointer flex justify-center">
                  <input type="submit" className="hidden" />
                  <IoIosSend />
               </label>
            </div>
         </form>
      </Container>
   );
}

const Container = styled.div`
   padding: 1rem;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 100%;
   box-sizing: border-box;
   overscroll-behavior: none;

   .selected {
      border-radius: 10px;
      background-color: #edf6ff;
   }
`;

const CommentWrapper = styled.div<{
   selected: boolean;
   isScrollable?: boolean;
}>`
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   height: ${(props) =>
      props.isScrollable === false ? 'fit-content' : props.selected ? 'calc(95dvh - 11rem)' : 'calc(95dvh - 9.5rem)'};
   overflow: auto;
   overscroll-behavior: none;
`;
