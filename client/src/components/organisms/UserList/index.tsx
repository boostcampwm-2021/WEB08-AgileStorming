import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userListOpenState, userListState } from 'recoil/user-list';
import { PopupItemLayout, PopupLayout } from 'components/molecules';
import { BoxButton } from 'components/atoms';
import { IconButton } from 'components/molecules';
import { userIcon, share } from 'img';
import useToast from 'hooks/useToast';

interface IProps {}

export const UserList: React.FC<IProps> = () => {
  const [isUserListOpen, setUserListOpen] = useRecoilState(userListOpenState);
  const userList = useRecoilValue(userListState);
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
      title={'공유됨: 3 명'}
      onClose={handleClickCloseBtn}
      popupStyle='normal'
      extraBtn={<IconButton zIdx={'1'} onClick={handleClickShareBtn} imgSrc={share} altText='공유하기 버튼' />}
    >
      <PopupItemLayout>
        {Object.keys(userList).map((e) => (
          <>
            <p>{userList[e].name}</p>
            <p>{userList[e].online ? 'online' : 'offline'}</p>
          </>
        ))}
      </PopupItemLayout>
    </PopupLayout>
  ) : (
    <BoxButton onClick={handleClickBoxBtn} btnStyle={'normal'} margin='1rem auto 0 0'>
      <img src={userIcon} alt='유저 아이콘'></img>
      {'명 접속 중'}
    </BoxButton>
  );
};

export default UserList;
