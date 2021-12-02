import styled from '@emotion/styled';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BoxButton } from 'components/atoms';
import { PopupItemLayout, PopupLayout, IconButton, Profile } from 'components/molecules';
import { UserInProgressPopup } from 'components/organisms';
import useToast from 'hooks/useToast';
import { userIcon, share } from 'img';
import { connectedUserState, userListCurrentUserTopState, userMouseOverState } from 'recoil/project';

interface IStyledConnectionStatus {
  online: boolean;
}

const StyledUserInfoBox = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.primary1};
  ${({ theme }) => theme.flex.rowCenter}
  border-radius: 8px;
  margin: 5px 0;
  padding: 0 5px;
`;
const StyledConnectionStatus = styled.p<IStyledConnectionStatus>`
  color: ${({ theme, online }) => (online ? theme.color.red : theme.color.gray3)};
  font-size: ${({ theme }) => theme.fontSize.xlarge};
  margin: 0 0 0 auto;
  cursor: default;
`;

export const UserList = () => {
  const [isUserListOpen, setUserListOpen] = useState(false);
  const [mouseOverUser, setMouseOverUser] = useRecoilState(userMouseOverState);
  const userList = useRecoilValue(userListCurrentUserTopState)!;
  const connectedUsers = useRecoilValue(connectedUserState);
  const { showMessage } = useToast();

  const handleClickCloseBtn = () => setUserListOpen(false);
  const handleClickBoxBtn = () => setUserListOpen(true);
  const handleClickShareBtn = () => {
    navigator.clipboard.writeText(window.location.href);
    showMessage('공유 링크가 클립보드에 복사되었습니다.');
  };
  const handleOnMouseEnterList = (event: React.MouseEvent<HTMLElement>) => {
    setMouseOverUser(event.currentTarget.dataset.user!);
  };
  const handleOnMouseLeaveList = () => setMouseOverUser('');
  return isUserListOpen ? (
    <PopupLayout
      title={`공유됨: ${userList.length} 명`}
      onClose={handleClickCloseBtn}
      popupStyle='normal'
      extraBtn={<IconButton zIdx={'1'} onClick={handleClickShareBtn} imgSrc={share} altText='공유하기 버튼' />}
    >
      <PopupItemLayout>
        {userList.map((user) => {
          return (
            <StyledUserInfoBox
              key={user.id}
              data-user={user.id}
              onMouseEnter={handleOnMouseEnterList}
              onMouseLeave={handleOnMouseLeaveList}
            >
              <Profile user={user} width='120px' />
              <StyledConnectionStatus online={connectedUsers[user.id]}>
                {connectedUsers[user.id] ? 'online' : 'offline'}
              </StyledConnectionStatus>
              {mouseOverUser === user.id ? <UserInProgressPopup user={user} /> : null}
            </StyledUserInfoBox>
          );
        })}
      </PopupItemLayout>
    </PopupLayout>
  ) : (
    <BoxButton onClick={handleClickBoxBtn} btnStyle={'normal'} margin='1rem auto 0 0'>
      <img src={userIcon} alt='유저 아이콘'></img>
      {`${Object.keys(connectedUsers).length} 명 접속 중`}
    </BoxButton>
  );
};

export default UserList;
