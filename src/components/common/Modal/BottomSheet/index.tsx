'use client'

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button, ButtonProps } from '@/components'
import { toBodyStyleHidden } from '@/utils'

import * as S from './index.style'

interface IProps {
  maxHeight?: number
  title?: string
  children?: React.ReactNode
  noCloseButton?: boolean
  noHead?: boolean
  closeButtonType?: ButtonProps['$buttonType']
  closeButtonText?: string
  containerStyle?: string
  modalWrapperStyle?: string
  titleStyle?: string
  closeButtonStyle?: string
  closeButtonWrapperStyle?: string
  closeIconStyle?: string
  noScrollLock?: boolean
  closeAnimationToggle?: boolean
  disabled?: boolean
  isPartners?: boolean
  onClickClose?(): void
  onClickApply?(): void
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
      isPartners,
      onClickClose,
      onClickApply,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false)
    const [isClosed, setIsClosed] = useState(false)
    const [mousePosition, setMousePosition] = useState({
      downPositionY: 0,
      currentPositionY: 0,
      upPositionY: 0,
    })
    const [systemHeight, setSystemHeight] = useState(0)
    const isPressed = useRef(false)
    const animation = useRef(false)
    const { currentPositionY, downPositionY } = mousePosition
    const moveValue = currentPositionY - downPositionY
    const containerStyleObj = {
      transform: `translateY(${isClosed ? '100%' : `${moveValue}px`})`,
      WebkitTransformOrigin: `translateY(${
        isClosed ? '100%' : `${moveValue}px`
      })`,
    }

    useEffect(() => {
      setSystemHeight(window.innerHeight)
    }, [])

    useEffect(() => {
      setMounted(true)
      if (!noScrollLock) {
        toBodyStyleHidden(true)
      }

      return () => {
        setMounted(false)
        setIsClosed(false)
        toBodyStyleHidden(false)
      }
    }, [])

    useEffect(() => {
      if (typeof closeAnimationToggle !== 'undefined' && closeAnimationToggle) {
        onClickCloseButton()
      }
    }, [closeAnimationToggle])

    const onClickCloseButton = () => {
      setIsClosed(true)
      setTimeout(() => {
        onClickClose && onClickClose()
      }, 400)
    }

    const onTouchStart = (position: number) => {
      isPressed.current = true
      setMousePosition({
        currentPositionY: position,
        upPositionY: position,
        downPositionY: position,
      })
    }

    const onTouchMove = (position: number) => {
      if (isPressed.current && position > mousePosition.downPositionY) {
        setMousePosition({ ...mousePosition, currentPositionY: position })
      }
    }

    const onTouchEnd = (position: number, height: number) => {
      isPressed.current = false
      animation.current = true
      if (systemHeight) {
        if (
          position >
          systemHeight - (systemHeight - mousePosition.downPositionY) * 0.8
        ) {
          setMousePosition({
            ...mousePosition,
            currentPositionY: systemHeight + height,
          })
          onClickCloseButton()
        } else {
          setMousePosition({
            ...mousePosition,
            currentPositionY: mousePosition.downPositionY,
          })
        }
      }
      setTimeout(() => (animation.current = false), 400)
    }

    return mounted
      ? createPortal(
          <S.ContainerWrapper
            ref={ref}
            onMouseMove={(e) => onTouchMove(e.clientY)}
            onTouchMove={(e) => onTouchMove(e.touches[0].clientY)}
            onMouseUp={(e) => {
              e.stopPropagation()
              isPressed.current
                ? onTouchEnd(e.clientY, e.currentTarget.clientHeight)
                : onClickCloseButton()
            }}
            onTouchEnd={(e) => {
              e.stopPropagation()
              isPressed.current
                ? onTouchEnd(
                    e.changedTouches[0].clientY,
                    e.currentTarget.clientHeight
                  )
                : onClickCloseButton()
            }}
          >
            <S.Container
              $containerStyle={containerStyle}
              $isPartners={isPartners}
            >
              <S.ModalWrapper
                $animationOn={isClosed || animation.current}
                style={containerStyleObj}
                $isClosed={isClosed}
                $maxHeight={maxHeight}
                $modalWrapperStyle={modalWrapperStyle}
                onClick={(e) => e.stopPropagation()}
              >
                {!noCloseButton && (
                  <S.CloseSvgButton
                    onClick={onClickCloseButton}
                    $closeIconStyle={closeIconStyle}
                  >
                    <S.IconCloseStyled />
                  </S.CloseSvgButton>
                )}
                {!noHead && (
                  <S.TitleWrapper
                    onMouseDown={(e) => onTouchStart(e.clientY)}
                    onTouchStart={(e) => onTouchStart(e.touches[0].clientY)}
                  >
                    <p className='tab_line' />
                    {title && (
                      <S.Title $titleStyle={titleStyle}>{title}</S.Title>
                    )}
                  </S.TitleWrapper>
                )}
                <S.ContentWrapper
                  $maxHeight={maxHeight}
                  onMouseUp={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  {children}
                  {closeButtonType && closeButtonText && (
                    <S.ApplyButtonWrapper $cssStyle={closeButtonWrapperStyle}>
                      <Button
                        type={closeButtonType}
                        $buttonstyle={closeButtonStyle}
                        disabled={disabled}
                        text={closeButtonText}
                        onClick={() => {
                          if (onClickApply) {
                            onClickApply()
                            onClickCloseButton()
                          }
                        }}
                      />
                    </S.ApplyButtonWrapper>
                  )}
                </S.ContentWrapper>
              </S.ModalWrapper>
            </S.Container>
          </S.ContainerWrapper>,
          document.querySelector('#myportal')!
        )
      : null
  }
)
