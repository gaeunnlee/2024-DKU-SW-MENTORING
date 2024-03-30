import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../data/interface';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export default function BoardLayout({ api, setCell }: { api: string; setCell: (data: IPost) => JSX.Element }) {
   const { list, isLoading, bottom } = useInfiniteScroll<IPost>(api);
   const [isEmpty, setIsEmpty] = React.useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      !list && setIsEmpty(true);
   }, [list]);

   if (isEmpty) {
      return <div>데이터가 없습니다🥲</div>;
   }

   return (
      <>
         {list?.map((data) => (
            <div
               key={data.id}
               onClick={() => {
                  navigate(`${data.id}`);
               }}
            >
               {setCell(data)}
            </div>
         ))}
         {!isLoading && !isEmpty && <div ref={bottom} />}
      </>
   );
}
