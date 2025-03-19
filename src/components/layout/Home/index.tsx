'use client';

import React from 'react';

import { BottomSheet, Button } from '@/components';
import { useHomeStore } from '@/store';

export const HomeContainer: React.FC = () => {
  const { count, actions } = useHomeStore();
  const styles = {
    container: 'm-5',
  };

  return (
    <>
      <BottomSheet noCloseButton title="test">
        <div className="h-[5rem] w-full" />
      </BottomSheet>
      <main className={styles.container}>
        Count: {count} <br />
        <Button type="black" onClick={() => actions.setCount(count + 1)}>
          카운트 올리기
        </Button>
      </main>
    </>
  );
};
