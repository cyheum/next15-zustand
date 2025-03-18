import { IconClose } from '@svg'
import styled, { css, keyframes } from 'styled-components'

import { customStyles, mixins } from '@/styles'

const appear = keyframes`
  from {
    transform: translateY(100%)
  } to {
    transform: translateY(0)
  }
`

export const ContainerWrapper = styled.div`
  ${customStyles.modalContainerStyle}
  ${mixins.flexSet('flex-start')}
  width: 100%;
  height: 100%;
  background-color: inherit;
`

type ContainerProps = {
  $isPartners?: boolean
  $containerStyle?: string
}

export const Container = styled.div<ContainerProps>`
  ${mixins.flexSet('center', 'flex-end')}
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;

  @media (min-width: 1024px) {
    max-width: 450px;
    ${({ $isPartners }) =>
      $isPartners ? 'margin-left: 50%' : 'margin: 0 auto;'};
  }
  ${({ $containerStyle }) => $containerStyle && $containerStyle}
`

type ModalWrapperProps = {
  $modalWrapperStyle?: string
  $isClosed?: boolean
  $delay?: number
  $maxHeight?: number
  $animationOn?: boolean
}

export const ModalWrapper = styled.div<ModalWrapperProps>`
  position: relative;
  width: 100%;
  max-height: ${({ $maxHeight }) => $maxHeight ?? 70}vh;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: #fff;
  box-shadow: 0px 0px 14px #0000001a;
  ${({ $animationOn }) =>
    $animationOn &&
    css`
      transition: transform 400ms ease-in-out;
      transition: -webkit-transform 400ms ease-in-out;
      -webkit-transition: transform 400ms ease-in-out;
      -webkit-transition: -webkit-transform 400ms ease-in-out;
      -moz-transition: transform 400ms ease-in-out;
    `};
  -webkit-animation: ${appear} 400ms ${({ $delay }) => ($delay ?? 0) * 300}ms
    backwards ease-in-out;
  animation: ${appear} 400ms ${({ $delay }) => ($delay ?? 0) * 300}ms backwards
    ease-in-out;
  ${({ $modalWrapperStyle }) => $modalWrapperStyle}
`

export const CloseSvgButton = styled.button<{ $closeIconStyle?: string }>`
  position: absolute;
  top: 1.875rem;
  right: 1.875rem;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0.1875rem;
  ${({ $closeIconStyle }) => $closeIconStyle}
`

export const IconCloseStyled = styled(IconClose)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const TitleWrapper = styled.div`
  ${mixins.flexSet()}
  flex-direction: column;
  padding: 1.25rem 0 1.4375rem;

  .tab_line {
    width: 6rem;
    height: 0.3125rem;
    border-radius: 6.25rem;
    background-color: #cdcfd0;
  }
`

export const Title = styled.h2<{ $titleStyle?: string }>`
  font-size: 1.875rem;
  line-height: 2.375rem;
  white-space: pre-line;
  ${mixins.stopDrag()}
  ${({ $titleStyle }) => $titleStyle}
`

export const ContentWrapper = styled.div<{ $maxHeight?: number }>`
  max-height: calc(${({ $maxHeight }) => $maxHeight ?? 70}vh - 5.25rem);
  overflow-y: auto;
  ${mixins.noScrollbar()}
`

export const ApplyButtonWrapper = styled.div<{ $cssStyle?: string }>`
  ${({ $cssStyle }) => $cssStyle}
`
