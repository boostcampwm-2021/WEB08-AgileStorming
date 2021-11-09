import styled from '@emotion/styled';
import { Title } from 'components/atoms';
import React from 'react';

interface IProps {
  children?: React.ReactNode;
  title?: string;
}

export const Layout = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.bgWhite};
  border-top: 2px solid black;
  padding: 0.5rem 0;
  margin-top: 0.2rem;
`;

const NodeDetailLayout: React.FC<IProps> = ({ children, title }) => {
  return (
    <Layout>
      <Title titleStyle='small' margin='0'>
        {title}
      </Title>
      {children}
    </Layout>
  );
};

export default NodeDetailLayout;
