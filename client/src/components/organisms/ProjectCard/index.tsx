import React from 'react';
import { useRecoilValue } from 'recoil';
import { StyledBottomWrapper, StyledIconContainer, StyledLowerWrapper, StyledProjectCard, StyledTextContainer } from './style';
import { IconImg, SmallText, Title } from 'components/atoms';
import { IconButton } from 'components/molecules';
import { participants, share, thumbnail, trashcan } from 'img';
import { userState } from 'recoil/user';

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
    id: string;
  };
}

const ProjectCard: React.FC<IProps> = ({ name, count, creator, onClickShareButton, onClickDeleteButton, onClickProjectCard }) => {
  const user = useRecoilValue(userState);
  const isCreator = creator.id === user?.id;

  return (
    <StyledProjectCard onClick={onClickProjectCard}>
      <IconImg imgSrc={thumbnail} altText='썸네일' size={{ width: '100%', height: '60%' }} noPadding={true} noHover={true} />
      <StyledBottomWrapper>
        <StyledTextContainer>
          <Title titleStyle={'xlarge'} cursor={'pointer'}>
            {name}
          </Title>
          <SmallText color={'primary1'} weight={'bold'} cursor={'pointer'}>
            {'프로젝트 관리자: ' + creator.name}
          </SmallText>
        </StyledTextContainer>
        <StyledLowerWrapper>
          <StyledIconContainer>
            <IconImg imgSrc={participants} altText='' noHover={true} />
            <Title titleStyle={'normal'} margin='4px 0 0 0' cursor={'pointer'}>
              {count}
            </Title>
          </StyledIconContainer>
          <StyledIconContainer>
            <IconButton onClick={onClickShareButton} imgSrc={share} altText='공유하기 버튼' />
            {isCreator && <IconButton onClick={onClickDeleteButton} imgSrc={trashcan} altText='삭제하기 버튼' />}
          </StyledIconContainer>
        </StyledLowerWrapper>
      </StyledBottomWrapper>
    </StyledProjectCard>
  );
};

const isPropsEqual = (prev: IProps, current: IProps) => {
  return prev.projectId === current.projectId;
};

const ProjectCardMemo = React.memo(ProjectCard, isPropsEqual);

export default ProjectCardMemo;
