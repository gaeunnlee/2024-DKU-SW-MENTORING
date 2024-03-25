import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IMission, IPost } from '../data/interface';
import { HiUserCircle } from 'react-icons/hi';
import Carousel from './Carousel/Carousel';
import { getMission } from '../utils/getMission';

const Container = styled.div`
   display: flex;
   flex-direction: column;
`;

export default function Post({ data }: { data: IPost }) {
   const [missionName, setMissionName] = useState('');

   useEffect(() => {
      getMission(data.missionId).then(function (data: IMission) {
         setMissionName(data.name);
      });
   }, []);

   return (
      <Container>
         <div className="flex items-center gap-1">
            <HiUserCircle style={{ fontSize: '40px', color: '#ddd' }} />
            <div className="flex flex-col gap-1">
               <p>{data.author}</p>
               <p>{missionName}</p>
            </div>
         </div>
         <div>
            <Carousel data={data.images} />
         </div>
         <div className="flex flex-col gap-1 mt-5 ml-2">
            <div className="flex gap-2">
               <span className="text-blue-700">#{data.title}</span>
            </div>
            <p>{data.body}</p>
         </div>
      </Container>
   );
}
