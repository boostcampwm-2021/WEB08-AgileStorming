import React from 'react';
import { IconButton } from 'components/molecules';
import { IconImg, SmallText, Title } from 'components/atoms';
import { StyledBottomContainer, StyledIconContainer, StyledLowerContainer, StyledProjectCard, StyledTextContainer } from './style';
import { participants, share, thumbnail, trashcan } from 'img';

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
