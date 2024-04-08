import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { IPost } from '../data/interface';
import BoardLayout from '../components/BoardLayout';

export default function Index() {
   const Cell = ({ data }: { data: IPost }) => <Post key={data.id} data={data} />;
   return (
      <Layout>
         <BoardLayout<IPost> api="/post/mission-board?sort=id,desc" setCell={(data: IPost) => <Cell data={data} />} />
      </Layout>
   );
}
