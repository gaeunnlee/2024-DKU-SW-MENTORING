import React, { ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styled from 'styled-components';

export default function HorizontalScrollBox({
   children,
}: {
   children: ReactNode;
}) {
   return (
      <Wrapper>
         <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            pagination={{
               enabled: false,
            }}
            modules={[FreeMode, Pagination]}
            className="horizontalScrollBox"
         >
            {children}
         </Swiper>
      </Wrapper>
   );
}

const Wrapper = styled.div`
   .horizontalScrollBox > .swiper-wrapper,
   .horizontalScrollBox > .swiper-wrapper > .swiper-slide {
      width: fit-content !important;
      height: fit-content;
   }
`;
