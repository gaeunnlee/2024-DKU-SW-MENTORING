import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from './useApi';

export const useInfiniteScroll = <T>({ api, itemPerPage }: { api: string; itemPerPage?: number }) => {
   const [list, setList] = useState<T[]>([]);
   const [page, setPage] = useState(0);
   const [fetchSuccess, setFetchSuccess] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const bottom = useRef<HTMLDivElement>(null);
   const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
         setPage((prevPage) => prevPage + 1);
      }
   };
   const { get } = useApi();

   useEffect(() => {
      setPage(0);
      setList([]);
   }, [api]);

   useEffect(() => {
      const observer = new IntersectionObserver(callback);
      if (bottom.current) {
         observer.observe(bottom.current);
      }
      return () => observer.disconnect();
   });

   const fetchList = useCallback(
      async (boardPage: number) => {
         if (api.length > 0) {
            const API = `${api}&page=${boardPage}&size=${itemPerPage ? itemPerPage : 2}`;
            setFetchSuccess(false);
            get({
               api: API,
               auth: api.indexOf('my') > 0 ? true : undefined,
            }).then(function (data) {
               if (data.content.length !== 0) {
                  setList((prev) => {
                     return page === 0 ? data.content : prev.concat(data.content);
                  });
                  setFetchSuccess(true);
               }
            });
         }
      },
      [api, page]
   );

   // fetchList 성공시 isLoading false
   useEffect(() => {
      fetchSuccess && setIsLoading(list.length === 0);
   }, [fetchSuccess, list.length]);

   useEffect(() => {
      setIsLoading(true);
      fetchList(page);
   }, [fetchList, page]);

   return {
      list,
      setList,
      isLoading,
      bottom,
   };
};
