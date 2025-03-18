'use client';

import React from 'react';

import { Button } from '@/components';
import { useHomeStore } from '@/store';

export const HomeContainer: React.FC = () => {
  const { count, actions } = useHomeStore();
  const styles = {
    container: 'm-5',
  };

  return (
    <main className={`${styles.container}`}>
      Count: {count} <br />
      <Button type="black" onClick={() => actions.setCount(count + 1)}>
        카운트 올리기
      </Button>
    </main>
  );
};
