import React, { useState } from 'react';
import { NewProjectCard, TextInputModal } from 'components/organisms';

interface IProps {}

const NewProjectModalWrapper: React.FC<IProps> = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleClickPlusButton = () => {
    setModalVisible((isModalVisible) => !isModalVisible);
  };
  const handleClickOverlay = () => {
    setModalVisible(false);
  };
  const handleClickSubmitButton = () => {
    alert('submit');
  };
  return (
    <>
      <NewProjectCard
        onClickPlusButton={handleClickPlusButton}
        modal={
          <TextInputModal
            onClickSubmitButton={handleClickSubmitButton}
            onClickOverlay={handleClickOverlay}
            text={'새로운 프로젝트 만들기'}
            placeholder={'새 프로젝트 이름을 입력하세요.'}
            visible={isModalVisible}
          />
        }
      />
    </>
  );
};

export default NewProjectModalWrapper;
