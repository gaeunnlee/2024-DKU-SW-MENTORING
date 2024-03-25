import React, { useEffect, useState } from 'react';
import { IFile } from '../../data/interface';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function Carousel({ data }: { data: IFile[] }) {
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setTimeout(() => {
         setLoading(false);
      }, 200);
   });
   return (
      <div className="relative flex justify-center aspect-square overflow-hidden bg-gray-200 rounded-lg mt-2">
         <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ type: 'bullets' }}
            navigation={true}
            modules={[Navigation, Pagination]}
            className="swiper-carousel"
            style={{ opacity: loading ? '0' : '1' }}
         >
            {data.map((item) => (
               <SwiperSlide key={item.url}>
                  <img className="size-full object-cover" src={item.url} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
}
