'use client';

import { IconClose, IconCloseWhite } from '@svg';
import Image from 'next/image';
import React, { CSSProperties, forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button, ButtonProps } from '@/components';
import { toBodyStyleHidden } from '@/utils';

interface IProps {
  title?: string | React.ReactNode;
  fullWidth?: boolean;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  closeButtonText?: string;
  noBackClose?: boolean;
  noCloseButton?: boolean;
  containerStyle?: CSSProperties;
  modalWrapperStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
  topCloseButtonStyle?: CSSProperties;
  whiteTopCloseButton?: boolean;
  closeButtonType?: ButtonProps['$buttonType'];
  closeAnimationToggle?: boolean;
  noScrollLock?: boolean;
  noOverflow?: boolean;
  phoneMaxWidth?: boolean;
  onClickClose?(): void;
  onClickApply?(): void;
}

export const BasicModal = forwardRef<HTMLDivElement, IProps>(
  (
    {
      title,
      titleStyle,
      fullWidth,
      description,
      closeButtonText,
      noBackClose,
      children,
      noCloseButton = false,
      containerStyle,
      descriptionStyle,
      modalWrapperStyle,
      buttonStyle,
      topCloseButtonStyle,
      whiteTopCloseButton,
      noScrollLock,
      closeButtonType,
      closeAnimationToggle,
      noOverflow,
      phoneMaxWidth,
      onClickClose,
      onClickApply,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    const styles = {
      container: `modal_container`,

      modalWrapper: `${
        fullWidth ? 'w-full' : 'w-auto'
      } relatvie max-h-[90vh] mx-[1.125rem] pt-[1.875rem] pb-[1.125rem] px-[1.125rem] rounded-2xl bg-white ${
        isClosed ? 'opacity-[0]' : 'opacity-[1]'
      } transition-all ease-in-out duration-400 animate-appear ${
        isClosed ? 'transform-[translateY(5%)]' : 'transform-[translateY(0)]'
      } ${phoneMaxWidth ? 'md:max-x-[25.625rem]' : ''}`,

      modalInner: `max-h-[85vh] ${
        noOverflow ? '' : 'overflow-y-scroll'
      } no-scroll`,

      title: `font-bold leading-[1.75rem] mb-[0.875rem] text-xl text-black`,

      description: `leading-[1.6rem] pb-[0.75rem] text-base text-gray-900 whitespace-pre-line`,

      svgWrapper: `absolute top-[1.875rem] right-[1.875rem] w-[2rem] h-[2rem] p-[0.25rem]`,

      svg: `w-full h-full object-contain`,
    };

    useEffect(() => {
      setMounted(true);
      if (!noScrollLock) {
        toBodyStyleHidden(true);
      }

      return () => {
        setMounted(false);
        setIsClosed(false);
        toBodyStyleHidden(false);
      };
    }, []);

    useEffect(() => {
      if (typeof closeAnimationToggle !== 'undefined' && closeAnimationToggle) {
        onClickCloseButton();
      }
    }, [closeAnimationToggle]);

    const onClickCloseButton = () => {
      setIsClosed(true);
      setTimeout(() => {
        if (onClickClose) {
          onClickClose();
        }
      }, 400);
    };

    return mounted
      ? createPortal(
          <div
            ref={ref}
            className={styles.container}
            style={containerStyle}
            onClick={!noBackClose ? onClickCloseButton : undefined}
          >
            <div
              className={styles.modalWrapper}
              style={modalWrapperStyle}
              onClick={(e) => e.stopPropagation()}
            >
              {!noCloseButton && (
                <button
                  style={topCloseButtonStyle}
                  className={styles.svgWrapper}
                  onClick={onClickCloseButton}
                >
                  {whiteTopCloseButton ? (
                    <Image
                      src={IconCloseWhite}
                      alt={'svg'}
                      className={styles.svg}
                    />
                  ) : (
                    <Image src={IconClose} alt={'svg'} className={styles.svg} />
                  )}
                </button>
              )}
              <div className={styles.modalInner}>
                {title && (
                  <h1 style={titleStyle} className={styles.title}>
                    {title}
                  </h1>
                )}
                {description ? (
                  <p style={descriptionStyle} className={styles.description}>
                    {description}
                  </p>
                ) : (
                  children
                )}
              </div>
              {closeButtonText &&
                onClickClose &&
                (closeButtonType ? (
                  <Button
                    type={closeButtonType}
                    $buttonstyle={buttonStyle}
                    text={closeButtonText}
                    onClick={() => {
                      if (onClickApply) {
                        onClickApply();
                      }
                      onClickCloseButton();
                    }}
                  />
                ) : (
                  <div style={buttonStyle}>
                    <button
                      className={'button'}
                      onClick={() => {
                        if (onClickApply) {
                          onClickApply();
                        }
                        onClickCloseButton();
                      }}
                    >
                      {closeButtonText}
                    </button>
                  </div>
                ))}
            </div>
          </div>,
          document.querySelector('#myportal')!
        )
      : null;
  }
);
