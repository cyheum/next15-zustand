'use client';

import { IconClose } from '@svg';
import Image from 'next/image';
import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Button, ButtonProps } from '@/components';
import { toBodyStyleHidden } from '@/utils';

interface IProps {
  maxHeight?: number;
  title?: string;
  children?: React.ReactNode;
  noCloseButton?: boolean;
  noHead?: boolean;
  closeButtonType?: ButtonProps['$buttonType'];
  closeButtonText?: string;
  containerStyle?: CSSProperties;
  modalWrapperStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  closeButtonStyle?: CSSProperties;
  closeButtonWrapperStyle?: CSSProperties;
  closeIconStyle?: CSSProperties;
  noScrollLock?: boolean;
  closeAnimationToggle?: boolean;
  disabled?: boolean;
  onClickClose?(): void;
  onClickApply?(): void;
}

export const BottomSheet = forwardRef<HTMLDivElement, IProps>(
  (
    {
      maxHeight,
      title,
      noHead,
      children,
      noCloseButton = false,
      closeButtonType,
      closeButtonText,
      containerStyle,
      modalWrapperStyle,
      titleStyle,
      closeButtonStyle,
      closeButtonWrapperStyle,
      closeIconStyle,
      noScrollLock,
      closeAnimationToggle,
      disabled,
      onClickClose,
      onClickApply,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [mousePosition, setMousePosition] = useState({
      downPositionY: 0,
      currentPositionY: 0,
      upPositionY: 0,
    });
    const [systemHeight, setSystemHeight] = useState(0);
    const isPressed = useRef(false);
    const animation = useRef(false);
    const { currentPositionY, downPositionY } = mousePosition;
    const moveValue = currentPositionY - downPositionY;
    const styles = {
      containerWrapper: `modal_container w-full h-full bg-inherit flex justify-start items-center`,

      container: `flex justify-center items-end bg-[rgba(0, 0, 0, 0.6)] w-full h-full lg:max-w-450`,

      modalWrapper: `relative w-full max-h-[70rem] rounded-t-[1rem] bg-white shadow-[0 0 0.875rem #0000001a] ${
        isClosed || animation.current
          ? 'transition-[transform] duration-400 ease-in-out'
          : ''
      } animate-appear2`,

      svgWrapper: `absolute top-[1.875rem] right-[1.875rem] w-[1.75rem] h-[1.75rem] p-[0.1875rem]`,

      svg: `w-full h-full object-contain`,

      titleWrapper: `flex-center flex-col pt-[1.25rem] pb-[1.4375rem]`,

      tabLine: `w-[6rem] h-[0.3125rem] rounded-[6.25rem] bg-[#cdcfd0]`,

      title: `text-3xl leading-[2.375rem] whitespace-pre-line stop-drag`,

      contentWrapper: `max-h-[calc(70vh - 5.25rem)] overflow-y-auto no-scroll`,
    };
    const containerStyleObj = {
      transform: `translateY(${isClosed ? '100%' : `${moveValue}px`})`,
      WebkitTransformOrigin: `translateY(${
        isClosed ? '100%' : `${moveValue}px`
      })`,
    };

    useEffect(() => {
      setSystemHeight(window.innerHeight);
    }, []);

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
        onClickClose && onClickClose();
      }, 400);
    };

    const onTouchStart = (position: number) => {
      isPressed.current = true;
      setMousePosition({
        currentPositionY: position,
        upPositionY: position,
        downPositionY: position,
      });
    };

    const onTouchMove = (position: number) => {
      if (isPressed.current && position > mousePosition.downPositionY) {
        setMousePosition({ ...mousePosition, currentPositionY: position });
      }
    };

    const onTouchEnd = (position: number, height: number) => {
      isPressed.current = false;
      animation.current = true;
      if (systemHeight) {
        if (
          position >
          systemHeight - (systemHeight - mousePosition.downPositionY) * 0.8
        ) {
          setMousePosition({
            ...mousePosition,
            currentPositionY: systemHeight + height,
          });
          onClickCloseButton();
        } else {
          setMousePosition({
            ...mousePosition,
            currentPositionY: mousePosition.downPositionY,
          });
        }
      }
      setTimeout(() => (animation.current = false), 400);
    };

    return mounted
      ? createPortal(
          <div
            ref={ref}
            className={styles.containerWrapper}
            onMouseMove={(e) => onTouchMove(e.clientY)}
            onTouchMove={(e) => onTouchMove(e.touches[0].clientY)}
            onMouseUp={(e) => {
              e.stopPropagation();
              isPressed.current
                ? onTouchEnd(e.clientY, e.currentTarget.clientHeight)
                : onClickCloseButton();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              isPressed.current
                ? onTouchEnd(
                    e.changedTouches[0].clientY,
                    e.currentTarget.clientHeight
                  )
                : onClickCloseButton();
            }}
          >
            <div className={styles.container} style={containerStyle}>
              <div
                className={styles.modalWrapper}
                style={{ ...containerStyleObj, ...modalWrapperStyle }}
                onClick={(e) => e.stopPropagation()}
              >
                {!noCloseButton && (
                  <button
                    className={styles.svgWrapper}
                    style={closeIconStyle}
                    onClick={onClickCloseButton}
                  >
                    <Image src={IconClose} alt={'svg'} className={styles.svg} />
                  </button>
                )}
                {!noHead && (
                  <div
                    className={styles.titleWrapper}
                    onMouseDown={(e) => onTouchStart(e.clientY)}
                    onTouchStart={(e) => onTouchStart(e.touches[0].clientY)}
                  >
                    <p className={styles.tabLine} />
                    {title && (
                      <h2 className={styles.title} style={titleStyle}>
                        {title}
                      </h2>
                    )}
                  </div>
                )}
                <div
                  className={styles.contentWrapper}
                  onMouseUp={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  {children}
                  {closeButtonType && closeButtonText && (
                    <div style={closeButtonWrapperStyle}>
                      <Button
                        type={closeButtonType}
                        $buttonstyle={closeButtonStyle}
                        disabled={disabled}
                        text={closeButtonText}
                        onClick={() => {
                          if (onClickApply) {
                            onClickApply();
                            onClickCloseButton();
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.querySelector('#myportal')!
        )
      : null;
  }
);
