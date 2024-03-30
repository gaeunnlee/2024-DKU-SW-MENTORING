import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { IPostBoard, IPost } from '../data/interface';
import { useApi } from '../hooks/useApi';
import BoardLayout from '../components/BoardLayout';

export default function Index() {
   const Cell = ({ data }: { data: IPost }) => <Post key={data.id} data={data} />;
   return (
      <Layout className="flex flex-col gap-9">
         <BoardLayout api="/post/mission-board" setCell={(data: IPost) => <Cell data={data} />} />
      </Layout>
   );
}
