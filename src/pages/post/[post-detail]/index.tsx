import React, { useEffect, useState } from 'react';
import Post from '../../../components/common/Post';
import { useLocation } from 'react-router-dom';
import { IPost } from '../../../data/interface';
import { useApi } from '../../../hooks/useApi';
import Layout from '../../../components/common/Layout';
import { useNavStore } from '../../../stores/nav-stores';

export default function PostDetail() {
   const { pathname } = useLocation();
   const [post, setPost] = useState<IPost>();
   const [postId, setPostId] = useState<string>();
   const { get } = useApi();
   const { setIsPreviousVisible } = useNavStore();

   useEffect(() => {
      setPostId(pathname.split('/post/')[1]);
      setIsPreviousVisible(true);
   }, []);

   useEffect(() => {
      postId !== undefined &&
         get({ api: `/post/mission-board/${postId}`, auth: true }).then((response: IPost) => {
            setPost(response);
         });
   }, [postId]);

   return <Layout>{post !== undefined ? <Post data={post} /> : <></>}</Layout>;
}
