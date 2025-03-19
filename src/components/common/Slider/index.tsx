'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React, { CSSProperties, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import { Button } from '../Button';

interface IProps {
  containerStyle?: CSSProperties;
  data: any[];
}

export const Slider: React.FC<IProps & SwiperProps> = (props) => {
  const sliderRef = useRef<SwiperRef>(null);

  const { containerStyle, modules, data, ...res } = props;

  const onClickNext = () => {
    sliderRef.current?.swiper.slideNext();
  };

  const onClickPrev = () => {
    sliderRef.current?.swiper.slidePrev();
  };

  return (
    <>
      <Swiper
        ref={sliderRef}
        style={containerStyle}
        modules={modules ?? [Pagination, Navigation]}
        {...res}
      >
        <div className="flex justify-center items-center gap-1">
          <Button onClick={onClickPrev}>이전</Button>
          <Button onClick={onClickNext}>다음</Button>
        </div>
        {data.map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex-center h-20">Slide {idx + 1}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
