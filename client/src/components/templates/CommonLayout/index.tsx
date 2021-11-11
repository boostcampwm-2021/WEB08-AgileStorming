import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import { filterIcon } from 'img';
import { BoxButton } from 'components/atoms';
import { NodeDetailWrapper, UserList } from 'components/organisms';
import useSocketSetup from 'hooks/useSocketSetup';
import { Header } from 'components/organisms';
import { Spinner } from 'components/molecules';

export const Template = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.bgWhite};
`;

export const LeftInfo = styled.div`
  position: fixed;
  top: 2.2rem;
  left: 0;
  width: 270px;
  padding: 1rem;
  z-index: 1;
`;

export const RightInfo = styled.div`
  position: fixed;
  top: 2.2rem;
  right: 0;
  width: 270px;
  padding: 1rem;
  z-index: 1;
`;

interface IProps {
  children?: React.ReactNode;
}

const CommonLayout: React.FC<IProps> = ({ children }) => {
  useSocketSetup();
  const handleFilterButton = () => {};

  return (
    <Template>
      <Header />
      <Suspense fallback={<Spinner />}>
        <LeftInfo>
          <UserList />
        </LeftInfo>
        <RightInfo>
          <BoxButton onClick={handleFilterButton} btnStyle={'normal'} margin='1rem 0 0 auto'>
            <img src={filterIcon} alt='필터링 버튼'></img>
            {'필터링'}
          </BoxButton>
          <NodeDetailWrapper />
        </RightInfo>
      </Suspense>
      {children}
    </Template>
  );
};

export default CommonLayout;
