import React from 'react';
import styled from '@emotion/styled';
import * as img from 'img';
import { SmallText } from 'components/atoms';
import { IconButton } from 'components/molecules';

interface IProps {
  projectId: string;
  onClickShareButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDeleteButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickProjectCard: (event: React.MouseEvent<HTMLDivElement>) => void;
  name: string;
  count: number;
  creator: {
    color: string;
    icon: string;
    name: string;
  };
}

const StyledProjectCard = styled.div`
  ${(props) => props.theme.flex.column}
  width: 320px;
  height: 300px;
  background: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray3};
  border-radius: 5px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  margin: 10px;
  padding: ${({ theme }) => theme.padding.xxlarge};
  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.color.bgWhite};
  }
`;

const StyledIconContainer = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  margin: auto 0 0 auto;
`;

const StyledTextContainer = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  margin: auto 0;
`;

const ProjectCard: React.FC<IProps> = ({ name, count, creator, onClickShareButton, onClickDeleteButton, onClickProjectCard }) => {
  return (
    <StyledProjectCard onClick={onClickProjectCard}>
      <StyledTextContainer>
        <SmallText color={'black'} weight={'bold'}>
          {'프로젝트: ' + name}
        </SmallText>
        <SmallText color={'gray1'} weight={'normal'}>
          {'참여자 수: ' + count}
        </SmallText>
        <SmallText color={'primary1'} weight={'bold'}>
          {'만든 이: ' + creator.name}
        </SmallText>
      </StyledTextContainer>
      <StyledIconContainer>
        <IconButton onClick={onClickShareButton} imgSrc={img.share} altText='공유하기 버튼' />
        <IconButton onClick={onClickDeleteButton} imgSrc={img.trashcan} altText='삭제하기 버튼' />
      </StyledIconContainer>
    </StyledProjectCard>
  );
};

const isPropsEqual = (prev: IProps, current: IProps) => {
  return prev.projectId === current.projectId;
};

const ProjectCardMemo = React.memo(ProjectCard, isPropsEqual);

export default ProjectCardMemo;
