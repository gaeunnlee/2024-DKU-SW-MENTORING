import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { IPostBoard, IPost } from '../data/interface';
import { useApi } from '../hooks/useApi';

const Container = styled.div``;
export default function Index() {
   const [posts, setPosts] = useState<IPost[]>();
   const { get } = useApi();

   useEffect(() => {
      get({
         api: '/post/mission-board?bodySize=300&page=0&size=20&sort=id,desc',
      }).then(function (data: IPostBoard) {
         setPosts(data.content);
      });
   }, []);

   return (
      <Layout className="flex flex-col gap-9">
         {posts?.map((data: IPost) => <Post key={data.id} data={data} />)}
      </Layout>
   );
}
