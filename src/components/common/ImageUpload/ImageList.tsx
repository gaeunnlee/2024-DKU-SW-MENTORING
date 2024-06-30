import React from 'react';
import styled from 'styled-components';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const ImageWrapper = styled.div`
   box-sizing: border-box;
   height: 20rem;
   display: flex;
   justify-content: center;
   align-items: center;
   max-width: 20rem;
   width: 100%;
   flex-direction: column;
   font-size: 12px;
   color: #999;
   flex: 0 0 auto;
   overflow: hidden;
`;
const Image = styled.img`
   width: 100%;
   max-height: 100%;
   border-radius: 10px;
   border: 1px solid #ddd;
`;

export default function ImageList({ images }: { images: string[] }) {
   return (
      <div className="w-full">
         <Swiper
            slidesPerView={2}
            centeredSlides={true}
            spaceBetween={20}
            freeMode={true}
            pagination={{
               enabled: false,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
         >
            {images.map((image) => (
               <SwiperSlide key={image}>
                  <ImageWrapper>
                     <Image src={image} />
                  </ImageWrapper>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
}
