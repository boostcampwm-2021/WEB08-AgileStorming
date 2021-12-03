import styled from '@emotion/styled';
import { common } from 'styles';

export type TStyle = 'normal' | 'modal';

interface IStyleProps {
  popupStyle: TStyle;
  margin?: string;
  isShow?: boolean;
}

const styleOptions: { [key in TStyle]: string } = {
  normal: `
      position: relative;
      font-size: ${common.fontSize.small};
      padding: 0.5rem;
    `,
  modal: `
      position: fixed;
      top: 35%;
      left: 37.5%;
      width: 25%;
      min-width: 20rem;
      padding: 0.5rem  1rem  1rem 1rem;
      font-size: ${common.fontSize.normal};
      z-index: 3;
      overflow: hidden;
    `,
};

const headerStyleOptions: { [key in TStyle]: string } = {
  normal: `
        font-size: ${common.fontSize.small};
      `,
  modal: `
        color: ${common.color.white};
        font-size: ${common.fontSize.large};
        padding-top:0.2rem;
        padding-bottom:1rem;
      `,
};

const headerBackGroundStyleOptions: { [key in TStyle]: string } = {
  normal: ``,
  modal: `
    height: 2.5rem;  
    background-color: ${common.color.primary1};
    `,
};

export const Layout = styled.div<IStyleProps>`
  ${({ popupStyle }) => styleOptions[popupStyle]}
  ${({ theme }) => theme.shadow};
  margin: ${({ margin }) => margin};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0.5rem;
  animation: ${({ isShow }) => (isShow ? 'popShow' : 'popHide')} 0.3s forwards;

  @keyframes popShow {
    0% {
      transform: scale(0.6);
    }
    40% {
      transform: scale(1);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes popHide {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.1);
    }
    60% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;

export const PopupHeaderBackGround = styled.div<IStyleProps>`
  position: absolute;
  ${({ popupStyle }) => headerBackGroundStyleOptions[popupStyle]}
  top: 0;
  left: 0;
  width: 100%;
`;

export const PopupHeader = styled.div<IStyleProps>`
  ${({ popupStyle }) => headerStyleOptions[popupStyle]}
  ${({ theme }) => theme.flex.rowCenter};
  p {
    font-weight: bold;
    z-index: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  img {
    cursor: pointer;
    margin-left: auto;
    z-index: 1;
    :hover {
      border-radius: 1rem;
      background: ${(props) => props.theme.color.gray3};
      opacity: 0.8;
    }
  }
`;
