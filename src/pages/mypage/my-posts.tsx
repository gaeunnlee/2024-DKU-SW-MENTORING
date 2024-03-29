import React, { useEffect, useState } from 'react';
import { useNavStore } from '../../stores/nav-stores';
import UserPosts from './userPosts';
import Layout from '../../components/Layout';

export default function MyPosts() {
   const { setIsPreviousVisible } = useNavStore();

   useEffect(() => {
      setIsPreviousVisible(true);
   }, []);

   return (
      <Layout>
         <UserPosts />
      </Layout>
   );
}
