import { IconClose, IconCloseWhite } from '@svg'
import styled, { css, keyframes } from 'styled-components'

import { color, customStyles, mixins } from '@/styles'

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(5%)
  } to {
    opacity: 1;
    transform: translateY(0)
  }
`

export const Container = styled.div<{ $containerStyle?: string }>`
  ${customStyles.modalContainerStyle}
  ${({ $containerStyle }) => $containerStyle && $containerStyle}
`

type ModalWrapperProps = {
  $fullWidth?: boolean
  $modalWrapperStyle?: string
  $isClosed?: boolean
  $delay?: number
  $noOverflow?: boolean
  $phoneMaxWidth?: boolean
}

export const ModalWrapper = styled.div<ModalWrapperProps>`
  position: relative;
  ${({ $fullWidth }) => $fullWidth && `width: 100%;`}
  max-height: 90vh;
  margin: 0 1.125rem;
  padding: 1.875rem 1.125rem 1.125rem;
  border-radius: 1rem;
  background-color: #fff;
  opacity: ${({ $isClosed }) => ($isClosed ? 0 : 1)};
  transform: translateY(${({ $isClosed }) => ($isClosed ? '5%' : '0')});
  transition: all 0.4s ease-in-out;
  -webkit-animation: ${appear} 400ms ${({ $delay }) => ($delay ?? 0) * 300}ms
    backwards ease-in-out;
  animation: ${appear} 400ms ${({ $delay }) => ($delay ?? 0) * 300}ms backwards
    ease-in-out;

  .basic_modal_wrapper {
    max-height: 85vh;
    overflow-y: ${({ $noOverflow }) => ($noOverflow ? 'unset' : 'scroll')};
    ${mixins.noScrollbar()}
  }

  ${({ $phoneMaxWidth }) =>
    $phoneMaxWidth &&
    css`
      @media (min-width: 768px) {
        max-width: 25.625rem;
      }
    `}

  ${({ $modalWrapperStyle }) => $modalWrapperStyle}
`

export const Title = styled.h1<{ $titleStyle?: string }>`
  ${mixins.fontStyle('bold')}
  ${mixins.lineStyle('1.75rem', 0)}
  margin-bottom: 0.875rem;
  font-size: 1.25rem;
  color: #000;
  ${({ $titleStyle }) => $titleStyle}
`

export const Description = styled.div<{ $descriptionStyle?: string }>`
  ${mixins.fontStyle()}
  ${mixins.lineStyle('1.6rem')}
  padding-bottom: 0.75rem;
  font-size: 1rem;
  color: ${color.gray[900]};
  white-space: pre-line;
  ${({ $descriptionStyle }) => $descriptionStyle}
`

export const CloseSvgButton = styled.button<{ $cssStyle?: string }>`
  position: absolute;
  top: 1.875rem;
  right: 1.875rem;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  ${({ $cssStyle }) => $cssStyle}
`

export const IconCloseStyled = styled(IconClose)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const IconWhiteClose = styled(IconCloseWhite)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const CloseButtonWrapper = styled.div<{ buttonStyle?: string }>`
  ${({ buttonStyle }) => buttonStyle}
`
