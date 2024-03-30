import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { IPost } from '../data/interface';
import BoardLayout from '../components/BoardLayout';

export default function Index() {
   const Cell = ({ data }: { data: IPost }) => <Post key={data.id} data={data} />;
   return (
      <Layout className="flex flex-col gap-9">
         <BoardLayout<IPost> api="/post/mission-board?" setCell={(data: IPost) => <Cell data={data} />} />
      </Layout>
   );
}
