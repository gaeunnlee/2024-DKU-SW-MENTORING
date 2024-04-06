import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Box from '../components/ui/Box';
import styled from 'styled-components';
import { useApi } from '../hooks/useApi';
import { ITeam, ITeamBoard } from '../data/interface';
import { useNavStore } from '../stores/nav-stores';

export default function Teams() {
   const [teams, setTeams] = useState<ITeam[]>();
   const { get } = useApi();
   const { setIsPreviousVisible } = useNavStore();

   useEffect(() => {
      get({ api: '/team?page=1&size=100' }).then(function (data: ITeamBoard) {
         setTeams(data.content);
         console.log(data.content);
      });
      setIsPreviousVisible(true);
   }, []);

   return (
      <Layout>
         {teams?.map((item, index) => (
            <Box shadow={false} key={item.id} className="cursor-pointer items-center gap-2">
               <Mission>
                  <Number>{index + 1}</Number>
                  <div className="flex flex-col gap-1">
                     <TeamName>{item.teamName}</TeamName>
                     <div className="flex gap-1">
                        {item.members.map((name) => (
                           <span key={name}>{name}</span>
                        ))}
                     </div>
                  </div>
               </Mission>
               {/* <span>{item.score}</span> */}
            </Box>
         ))}
      </Layout>
   );
}

const Mission = styled.div`
   display: flex;
   width: 100%;
   gap: 10px;
   align-items: center;
`;

const Number = styled.span`
   border-radius: 5px;
   width: 25px;
   height: 25px;
   font-size: 11px;
   font-weight: bold;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 2px;
   background-color: #ccc;
   color: #fff;
`;

const TeamName = styled.p``;
