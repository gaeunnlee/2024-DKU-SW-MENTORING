import React from 'react';
import { IPost } from '../../../data/interface';
import Post from '../../../components/common/Post';
import BoardLayout from '../../../components/common/BoardLayout';
import Layout from '../../../components/common/Layout';

export default function MyPosts() {
   const Cell = ({ data }: { data: IPost }) => <Post key={data.id} data={data} />;
   return (
      <Layout>
         <BoardLayout<IPost>
            api="/post/mission-board/my-team?sort=id,desc"
            setCell={(data: IPost) => <Cell data={data} />}
            option={{ itemPerPage: 2 }}
         />
      </Layout>
   );
}
