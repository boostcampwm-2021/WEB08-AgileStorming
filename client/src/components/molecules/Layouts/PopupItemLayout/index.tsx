import styled from '@emotion/styled';
import React from 'react';
import { Title } from 'components/atoms';

interface IProps {
  children?: React.ReactNode;
  title?: string;
}

export const Layout = styled.div`
  position: relative;
  border-top: 2px solid black;
  padding: 0.5rem 0;
  margin-top: 0.2rem;

  .selected {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary1};
  }
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
