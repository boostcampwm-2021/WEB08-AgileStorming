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

interface IStyledProps {
  color: string;
}

const StyledProjectCard = styled.div<IStyledProps>`
  ${({ theme }) => theme.flex.column}
  width: 320px;
  height: 300px;
  background: ${({ theme }) => theme.color.bgWhite};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: 5px;
  filter: ${({ color }) => `drop-shadow(0px 3px 3px #${color})`};
  margin: 10px;
  overflow: hidden;
  justify-content: space-between;
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
  margin-top: ${({ theme }) => theme.margin.normal};
`;

const StyledBottomContainer = styled.div`
  ${({ theme }) => theme.flex.columnCenter};
  overflow: hidden;
  padding: ${({ theme }) => theme.padding.normal};
`;

const StyledTextContainer = styled.div`
  ${({ theme }) => theme.flex.column};
  width: 100%;
  padding-left: ${({ theme }) => theme.padding.normal};
`;

const ProjectCard: React.FC<IProps> = ({ name, count, creator, onClickShareButton, onClickDeleteButton, onClickProjectCard }) => {
  return (
    <StyledProjectCard onClick={onClickProjectCard} color={creator.color}>
      <IconImg imgSrc={thumbnail} altText='썸네일' size={{ width: '100%', height: '60%' }} noPadding={true} noHover={true} />
      <StyledBottomContainer>
        <StyledTextContainer>
          <Title titleStyle={'xlarge'} cursor={'pointer'}>
            {name}
          </Title>
          <SmallText color={'primary1'} weight={'bold'} cursor={'pointer'}>
            {'프로젝트 관리자: ' + creator.name}
          </SmallText>
        </StyledTextContainer>
        <StyledLowerContainer>
          <StyledIconContainer>
            <IconImg imgSrc={participants} altText='' noHover={true} />
            <Title titleStyle={'normal'} margin='4px 0 0 0' cursor={'pointer'}>
              {count}
            </Title>
          </StyledIconContainer>
          <StyledIconContainer>
            <IconButton onClick={onClickShareButton} imgSrc={share} altText='공유하기 버튼' />
            <IconButton onClick={onClickDeleteButton} imgSrc={trashcan} altText='삭제하기 버튼' />
          </StyledIconContainer>
        </StyledLowerContainer>
      </StyledBottomContainer>
    </StyledProjectCard>
  );
};

const isPropsEqual = (prev: IProps, current: IProps) => {
  return prev.projectId === current.projectId;
};

const ProjectCardMemo = React.memo(ProjectCard, isPropsEqual);

export default ProjectCardMemo;
