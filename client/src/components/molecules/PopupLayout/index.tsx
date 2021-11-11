import React, { ReactElement } from 'react';
import { Layout, PopupHeader, PopupHeaderBackGround, TStyle } from './style';
import { closeIcon } from 'img';

interface IProps {
  onClose: React.MouseEventHandler;
  children?: React.ReactNode;
  popupStyle?: TStyle;
  title?: string;
  margin?: string;
  extraBtn?: ReactElement;
}

const PopupLayout: React.FC<IProps> = ({ children, onClose, title = '', margin = '0.5rem 0', popupStyle = 'normal', extraBtn }) => {
  return (
    <Layout popupStyle={popupStyle} margin={margin}>
      <PopupHeaderBackGround popupStyle={popupStyle} />
      <PopupHeader popupStyle={popupStyle}>
        <p>{title}</p>
        {extraBtn}
        <img onClick={onClose} src={closeIcon} alt='닫기' />
      </PopupHeader>
      {children}
    </Layout>
  );
};

export default PopupLayout;
