'use client';

import React, { CSSProperties } from 'react';

interface IProps {
  height?: number;
  big?: boolean;
  containerStyle?: CSSProperties;
}

export const ShopSpinner: React.FC<IProps> = ({
  height,
  big,
  containerStyle,
}) => {
  const styles = {
    container: `flex-center w-full z-1000`,

    spinner: `relative w-[5rem] h-[5rem] `,

    circle: `absolute top-[41.25%] w-[16.25%] h-[16.25%] rounded-[50%] bg-gray-850`,

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

  return (
    <div
      style={{ height: `${height ?? 10}rem`, ...containerStyle }}
      className={styles.container}
    >
      <div className={styles.spinner}>{circles}</div>
    </div>
  );
};
