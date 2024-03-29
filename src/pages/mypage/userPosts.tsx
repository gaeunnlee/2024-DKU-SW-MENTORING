import React from 'react';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { IPost, IPostBoard } from '../../data/interface';
import styled from 'styled-components';
import Masonry from 'react-responsive-masonry';
import { useNavigate } from 'react-router-dom';

export default function UserPosts() {
   const [userPosts, setUserPosts] = useState<IPost[]>();
   const { get } = useApi();
   const navigate = useNavigate();
   useEffect(() => {
      get({
         api: '/post/mission-board/my?page=0&size=20&bodySize=10',
         auth: true,
      }).then((response: IPostBoard) => {
         setUserPosts(response.content);
         console.log(response.content);
      });
   }, []);
   return (
      <Masonry columnsCount={3} gutter="0.5rem">
         {userPosts?.map((item) => {
            return (
               <PostItem
                  key={item.images[0].id}
                  onClick={() => {
                     navigate(`/post/${item.id}`);
                  }}
               >
                  <img className="w-full rounded-lg" src={item.images[0].url} />
               </PostItem>
            );
         })}
      </Masonry>
   );
}

const UserPostContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
`;
const PostItem = styled.div``;
