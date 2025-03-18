'use client';

import React, { CSSProperties } from 'react';

export interface ButtonProps {
  $buttonType:
    | 'white'
    | 'purple'
    | 'gray'
    | 'black'
    | 'blackWhite'
    | 'blue'
    | 'red'
    | 'pink'
    | 'sky_blue';
  $isLight?: boolean;
  disabledStyle?: string;
  $height?: number;
  $fontSize?: number;
  lineHeight?: string;
  $buttonstyle?: CSSProperties;
  $borderradius?: number;
  noPreventDefault?: boolean;
  noClick?: boolean;
  disabled?: boolean;
}

export interface ContainerProps {
  $containerstyle?: CSSProperties;
  containerClass?: string;
}

interface IProps extends Omit<ButtonProps, '$buttonType'>, ContainerProps {
  type?: ButtonProps['$buttonType'];
  onClick?(): void;
  disabled?: boolean;
  text?: string | React.ReactNode;
  getClassName?: string;
  children?: React.ReactNode;
  noStopPropagation?: boolean;
}

export const Button: React.FC<IProps> = ({
  $containerstyle,
  type = 'black',
  text,
  lineHeight,
  $isLight,
  disabled = false,
  onClick,
  children,
  $buttonstyle,
  getClassName,
  containerClass,
  noPreventDefault,
  noClick,
  noStopPropagation,
}) => {
  const styles = {
    container: `relative flex-1`,

    // disabled: `flex-center ${$isLight ? 'font-medium' : 'font-semibold'} ${
    //   lineHeight ? `leading-[${lineHeight}rem]` : ''
    // } w-full h-[${$height ?? 3}rem] mx-auto text-[${
    //   $fontSize ?? 0.9375
    // }rem] text-white whitespace-pre font-[inherit] bg-[#babec2] rounded-[${
    //   $borderradius ?? 0.625
    // }rem] border-[#babec2] cursor-not-allowed`,

    button: `flex-center ${$isLight ? 'font-medium' : 'font-semibold'} ${
      lineHeight ? `leading-[${lineHeight}rem]` : ''
    } w-full max-w-full  h-[3rem] mx-auto text-[0.9375rem] whitespace-pre font-[inherit] rounded-[0.625rem] transition-all border border-solid ${
      noClick ? 'cursor-pointer' : ''
    }  ${getClassName}`,

    commonDisabled: `disabled:border disabled:border-solid disabled:border-gray-170 disabled:text-white disabled:bg-gray-170 disabled:cursor-not-allowed`,

    active: `active:enabled:opacity-[0.7] lg:hover:enabled:opacity-[0.7]`,

    gray: `border-gray-570 bg-gray-570 text-white`,

    purple: `border-purple-430 bg-purple-430 text-white`,

    blackWhite: `border-black bg-white text-black`,

    white: `border-[#eee] bg-white text-gray-850 shadow-[0 0.25rem 0.25rem 0 #0000000f]`,

    black: `border-gray-850 bg-gray-850 text-white`,

    blue: `border-blue-850 bg-blue-850 text-white`,

    skyBlue: `border-[#2664e0] bg-[#2664e0] text-white`,
  };

  return (
    <div
      style={$containerstyle}
      className={`${styles.container} ${containerClass}`}
    >
      <button
        style={$buttonstyle}
        className={`${styles.button} ${
          type === 'gray'
            ? styles.gray
            : type === 'purple'
            ? styles.purple
            : type === 'blackWhite'
            ? styles.blackWhite
            : type === 'white'
            ? styles.white
            : type === 'blue'
            ? styles.blue
            : type === 'sky_blue'
            ? styles.skyBlue
            : styles.black
        } ${noClick ? '' : styles.active} ${styles.commonDisabled}`}
        disabled={disabled}
        onClick={(e) => {
          if (!noPreventDefault) {
            e.preventDefault();
          }
          if (!noClick && Boolean(onClick)) {
            e.stopPropagation();
            onClick!();
          }
        }}
        onMouseDown={(e) => {
          if (!noStopPropagation) {
            e.stopPropagation();
          }
        }}
        onTouchStart={(e) => {
          if (!noStopPropagation) {
            e.stopPropagation();
          }
        }}
      >
        {text}
        {children}
      </button>
    </div>
  );
};

export const MemoizedPrimaryButton = React.memo(Button);
