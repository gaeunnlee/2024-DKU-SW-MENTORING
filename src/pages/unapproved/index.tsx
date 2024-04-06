import React, { useEffect, useState } from 'react';
import { IPost, IPostBoard } from '../../data/interface';
import { useApi } from '../../hooks/useApi';
import Layout from '../../components/Layout';
import Post from '../../components/Post';
import { useNavStore } from '../../stores/nav-stores';

export default function UnapprovedPosts() {
   const [posts, setPosts] = useState<IPost[]>();
   const { get } = useApi();
   const { setIsPreviousVisible } = useNavStore();

   useEffect(() => {
      get({
         api: '/unapproved/mission?bodySize=300&page=0&size=20&sort=id,desc',
         auth: true,
      }).then(function (data: IPostBoard) {
         setPosts(data.content);
      });
      setIsPreviousVisible(true);
   }, []);

   return (
      <Layout className="flex flex-col gap-9">{posts?.map((data: IPost) => <Post key={data.id} data={data} />)}</Layout>
   );
}
