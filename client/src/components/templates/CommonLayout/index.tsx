import React from 'react';
import styled from '@emotion/styled';
import { filterIcon } from 'img';
import { BoxButton } from 'components/atoms';
import { NodeDetailWrapper } from 'components/organisms';

export const Template = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.bgWhite};
`;

export const LeftInfo = styled.div`
  position: fixed;
  left: 0;
  width: 270px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.red};
`;

export const RightInfo = styled.div`
  position: fixed;
  right: 0;
  width: 270px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.primary1};
`;

interface IProps {
  children?: React.ReactNode;
}

const CommonLayout: React.FC<IProps> = ({ children }) => {
  const handleFilterButton = () => {};

  return (
    <Template>
      {children}
      <LeftInfo></LeftInfo>
      <RightInfo>
        <BoxButton onClick={handleFilterButton} btnStyle={'normal'} margin='1rem 0 0 auto'>
          <img src={filterIcon} alt='필터링 버튼'></img>
          {'필터링'}
        </BoxButton>
        <NodeDetailWrapper />
      </RightInfo>
    </Template>
  );
};

export default CommonLayout;
