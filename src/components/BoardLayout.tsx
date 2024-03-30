import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

interface ICell {
   id: number;
}

interface IOption {
   noDesc?: boolean;
   itemPerPage?: number;
}

export default function BoardLayout<T extends ICell>({
   api,
   setCell,
   option,
}: {
   api: string;
   setCell: (data: T) => JSX.Element;
   option?: IOption;
}) {
   const { list, isLoading, bottom } = useInfiniteScroll<T>({
      api: api,
      itemPerPage: option?.itemPerPage,
      noDesc: option?.noDesc,
   });
   const [isEmpty, setIsEmpty] = React.useState(false);

   useEffect(() => {
      !list && setIsEmpty(true);
   }, [list]);

   if (isEmpty) {
      return <div>데이터가 없습니다🥲</div>;
   }

   return (
      <>
         {list?.map((data) => <div key={data.id}>{setCell(data)}</div>)}
         {!isLoading && !isEmpty && <div ref={bottom} />}
      </>
   );
}
