import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useLocation } from 'react-router-dom';
import { IPost } from '../data/interface';
import { useApi } from '../hooks/useApi';
import Layout from '../components/Layout';

export default function PostDetail() {
   const { pathname } = useLocation();
   const [post, setPost] = useState<IPost>();
   const [postId, setPostId] = useState<string>();
   const { get } = useApi();
   useEffect(() => {
      setPostId(pathname.split('/post/')[1]);
   }, []);
   useEffect(() => {
      postId !== undefined &&
         get({ api: `/post/mission-board/${postId}`, auth: true }).then(
            (response: IPost) => {
               console.log(response);
               setPost(response);
            }
         );
   }, [postId]);
   return <Layout>{post !== undefined ? <Post data={post} /> : <></>}</Layout>;
}
