'use client';

import React, { useEffect } from 'react';

import { toBodyStyleHidden } from '@/utils';

interface IProps {
  height?: number;
  big?: boolean;
}

export const Spinner: React.FC<IProps> = ({ big }) => {
  const styles = {
    container: `flex-center fixed top-[0] left-[0] w-full h-full z-[100000000] bg-[#0000004d]`,

    spinner: `relative w-[5rem] h-[5rem] `,

    circle: `absolute top-[41.25%] w-[16.25%] h-[16.25%] rounded-[50%] bg-orange-500`,

    lds1: `left-[10%] animate-lds1`,

    lds2: `left-[10%] animate-lds2`,

    lds3: `left-[40%] animate-lds2`,

    lds4: `left-[70%] animate-lds3`,
  };

  const circles = [...Array(4)].map((_, index) => (
    <div
      key={index}
      className={`${styles.circle} ${
        index === 0
          ? styles.lds1
          : index === 1
          ? styles.lds2
          : index === 2
          ? styles.lds3
          : styles.lds4
      }`}
    />
  ));

  useEffect(() => {
    toBodyStyleHidden(true);

    return () => {
      toBodyStyleHidden(false);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.spinner}>{circles}</div>
    </div>
  );
};
