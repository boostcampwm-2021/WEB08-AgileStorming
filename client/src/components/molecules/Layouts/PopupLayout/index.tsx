import React, { ReactElement, useState } from 'react';
import { Layout, PopupHeader, PopupHeaderBackGround, TStyle } from './style';
import { closeIcon } from 'img';

interface IProps {
  onClose: () => void;
  children?: React.ReactNode;
  popupStyle?: TStyle;
  title?: string;
  margin?: string;
  extraBtn?: ReactElement;
}

const PopupLayout: React.FC<IProps> = ({ children, onClose, title = '', margin = '0.5rem 0', popupStyle = 'normal', extraBtn }) => {
  const [isShow, setIsShow] = useState(true);

  const hidePopup = () => {
    setIsShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Layout popupStyle={popupStyle} margin={margin} isShow={isShow}>
      <PopupHeaderBackGround popupStyle={popupStyle} />
      <PopupHeader popupStyle={popupStyle}>
        <p>{title}</p>
        {extraBtn}
        <img onClick={hidePopup} width={'18px'} height={'18px'} src={closeIcon} alt='닫기' />
      </PopupHeader>
      {children}
    </Layout>
  );
};

export default PopupLayout;
