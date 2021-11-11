import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { connectedUserState, userListOpenState, queryUserListState } from 'recoil/user-list';
import { PopupItemLayout, PopupLayout } from 'components/molecules';
import { BoxButton } from 'components/atoms';
import { IconButton, Profile } from 'components/molecules';
import { userIcon, share } from 'img';
import styled from '@emotion/styled';
import useToast from 'hooks/useToast';

interface IProps {}
interface IStyledConnectionStatus {
  online: boolean;
}

const StyledUserInfoBox = styled.div`
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
`;

export const UserList: React.FC<IProps> = () => {
  const [isUserListOpen, setUserListOpen] = useRecoilState(userListOpenState);
  const userList = useRecoilValue(queryUserListState)!;
  const connectedUsers = useRecoilValue(connectedUserState);
  const { showMessage } = useToast();
  const handleClickCloseBtn = () => {
    setUserListOpen(false);
  };
  const handleClickBoxBtn = () => {
    setUserListOpen(true);
  };
  const handleClickShareBtn = () => {
    navigator.clipboard.writeText(window.location.href);
    showMessage('공유 링크가 클립보드에 복사되었습니다.');
  };
  return isUserListOpen ? (
    <PopupLayout
      title={`공유됨: ${Object.keys(userList).length} 명`}
      onClose={handleClickCloseBtn}
      popupStyle='normal'
      extraBtn={<IconButton zIdx={'1'} onClick={handleClickShareBtn} imgSrc={share} altText='공유하기 버튼' />}
    >
      <PopupItemLayout>
        {Object.values(userList).map((user) => {
          return (
            <StyledUserInfoBox key={user.id}>
              <Profile user={user} />
              <StyledConnectionStatus online={connectedUsers[user.id]}>
                {connectedUsers[user.id] ? 'online' : 'offline'}
              </StyledConnectionStatus>
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
