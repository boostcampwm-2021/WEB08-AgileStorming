import React from 'react';
import styled from '@emotion/styled';
import { participants, share, thumbnail, trashcan } from 'img';
import { IconImg, SmallText, Title } from 'components/atoms';
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

interface IStyledProjectCardProps {
  color: string;
}

const StyledProjectCard = styled.div<IStyledProjectCardProps>`
  ${({ theme }) => theme.flex.column}
  width: 320px;
  height: 300px;
  background: ${({ color }) => '#' + color};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: 5px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  margin: 10px;
  padding: ${({ theme }) => theme.padding.xxlarge};
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.bgWhite};
  }
`;

const StyledLowerContainer = styled.div`
  ${({ theme }) => theme.flex.row}
  width: 100%;
  justify-content: space-between;
`;

const StyledIconContainer = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  align-items: center;
`;

const StyledUpperContainer = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  margin: auto 0;
`;

const StyledTextContainer = styled.div`
  ${({ theme }) => theme.flex.column};
  width: 100%;
  padding-left: 1.5rem;
`;

const ProjectCard: React.FC<IProps> = ({ name, count, creator, onClickShareButton, onClickDeleteButton, onClickProjectCard }) => {
  return (
    <StyledProjectCard onClick={onClickProjectCard} color={creator.color}>
      <StyledUpperContainer>
        <IconImg imgSrc={thumbnail} altText='썸네일' size={{ width: '260px', height: '160px' }} borderRadius='20px' noHover={true} />
        <StyledTextContainer>
          <Title titleStyle={'xlarge'}>{name}</Title>
          <SmallText color={'primary1'} weight={'bold'}>
            {'프로젝트 관리자: ' + creator.name}
          </SmallText>
        </StyledTextContainer>
      </StyledUpperContainer>
      <StyledLowerContainer>
        <StyledIconContainer>
          <IconImg imgSrc={participants} altText='' noHover={true} />
          <Title titleStyle={'normal'} margin='4px 0 0 0'>
            {count}
          </Title>
        </StyledIconContainer>
        <StyledIconContainer>
          <IconButton onClick={onClickShareButton} imgSrc={share} altText='공유하기 버튼' />
          <IconButton onClick={onClickDeleteButton} imgSrc={trashcan} altText='삭제하기 버튼' />
        </StyledIconContainer>
      </StyledLowerContainer>
    </StyledProjectCard>
  );
};

const isPropsEqual = (prev: IProps, current: IProps) => {
  return prev.projectId === current.projectId;
};

const ProjectCardMemo = React.memo(ProjectCard, isPropsEqual);

export default ProjectCardMemo;
