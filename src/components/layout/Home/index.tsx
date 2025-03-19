'use client';

import React from 'react';

import { Button } from '@/components';
import { Slider } from '@/components';
import { useHomeStore } from '@/store';

export const HomeContainer: React.FC = () => {
  const { count, actions } = useHomeStore();
  const styles = {
    container: 'm-5',
  };

  return (
    <>
      {/* <BottomSheet noCloseButton title="test">
        <div className="h-[5rem] w-full" />
      </BottomSheet> */}
      <main className={styles.container}>
        Count: {count} <br />
        <Button type="black" onClick={() => actions.setCount(count + 1)}>
          카운트 올리기
        </Button>
        <Slider
          //@ts-expect-error
          containerStyle={{ '--swiper-pagination-bottom': '50px' }}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
        />
      </main>
    </>
  );
};
