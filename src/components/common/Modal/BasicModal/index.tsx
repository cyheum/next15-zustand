'use client'

import React, { forwardRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button, ButtonProps } from '@/components'
import { toBodyStyleHidden } from '@/utils'

import * as S from './index.style'

interface IProps {
  title?: string | React.ReactNode
  fullWidth?: boolean
  description?: string | React.ReactNode
  children?: React.ReactNode
  closeButtonText?: string
  noBackClose?: boolean
  noCloseButton?: boolean
  containerStyle?: string
  modalWrapperStyle?: string
  buttonStyle?: string
  titleStyle?: string
  descriptionStyle?: string
  topCloseButtonStyle?: string
  whiteTopCloseButton?: boolean
  closeButtonType?: ButtonProps['$buttonType']
  closeAnimationToggle?: boolean
  noScrollLock?: boolean
  noOverflow?: boolean
  phoneMaxWidth?: boolean
  onClickClose?(): void
  onClickApply?(): void
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
    const [mounted, setMounted] = useState(false)
    const [isClosed, setIsClosed] = useState(false)

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
        if (onClickClose) {
          onClickClose()
        }
      }, 400)
    }

    return mounted
      ? createPortal(
          <S.Container
            ref={ref}
            onClick={!noBackClose ? onClickCloseButton : undefined}
            $containerStyle={containerStyle}
          >
            <S.ModalWrapper
              $fullWidth={fullWidth}
              $isClosed={isClosed}
              $noOverflow={noOverflow}
              $phoneMaxWidth={phoneMaxWidth}
              $modalWrapperStyle={modalWrapperStyle}
              onClick={(e) => e.stopPropagation()}
            >
              {!noCloseButton && (
                <S.CloseSvgButton
                  $cssStyle={topCloseButtonStyle}
                  onClick={onClickCloseButton}
                >
                  {whiteTopCloseButton ? (
                    <S.IconWhiteClose />
                  ) : (
                    <S.IconCloseStyled />
                  )}
                </S.CloseSvgButton>
              )}
              <div className='basic_modal_wrapper'>
                {title && <S.Title $titleStyle={titleStyle}>{title}</S.Title>}
                {description ? (
                  <S.Description $descriptionStyle={descriptionStyle}>
                    {description}
                  </S.Description>
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
                        onClickApply()
                      }
                      onClickCloseButton()
                    }}
                  />
                ) : (
                  <S.CloseButtonWrapper buttonStyle={buttonStyle}>
                    <button
                      className={'button'}
                      onClick={() => {
                        if (onClickApply) {
                          onClickApply()
                        }
                        onClickCloseButton()
                      }}
                    >
                      {closeButtonText}
                    </button>
                  </S.CloseButtonWrapper>
                ))}
            </S.ModalWrapper>
          </S.Container>,
          document.querySelector('#myportal')!
        )
      : null
  }
)
